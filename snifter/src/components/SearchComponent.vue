<template>
  <div class="search-component">
    <div class="search-wrapper">
      <va-button-dropdown
        :icon="searchTypes.at(searchIndex)[1]"
        :label="searchTypes.at(searchIndex)[0]"
      >
        <va-list class="search-item-list">
          <va-list-item
            class="search-item"
            v-for="(type, index) in searchTypes"
            :key="index"
            @click="searchIndex = index"
          >
            <va-list-item-section avatar>
              <va-icon :name="type[1]"></va-icon>
            </va-list-item-section>
            <va-list-item-section>
              <va-list-item-label>{{ type[0] }}</va-list-item-label>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </va-button-dropdown>
      <div>
        <va-form @keyup="startSearch()" class="search-input-form" v-if="searchIndex === 0">
          <va-input
            class="mb-4"
            v-model="generalSearchField"
            label="Search By Collection Name"
            :rules="[(v) => v.length > 0 || `Must provide value for search`]"
            placeholder="Required"
          />
        </va-form>
        <va-form @keyup="startSearch()" class="search-input-form" v-else-if="searchIndex === 1">
          <va-input
            class="mb-4"
            v-model="generalSearchField"
            label="NFT Name"
            placeholder="Required"
          />
        </va-form>
        <va-form @keyup="startSearch()" class="search-input-form" v-else-if="searchIndex === 2">
          <va-input
            class="mb-4"
            v-model="generalSearchField"
            label="Address"
            placeholder="Required"
          />
        </va-form>

        <va-form class="search-input-form" v-else-if="searchIndex === 3">
          <va-button-dropdown
          gradient
          :label="expressionOptions.at(expressionIndex)[0]"
          >
            <va-list class="search-item-list">
              <va-list-item
                class="search-item"
                v-for="(type, index) in expressionOptions"
                :key="index"
                @click="expressionIndex = index"
              >
                <va-list-item-section>
                  <va-list-item-label :class="'search-type-label'">{{ type[0] }}</va-list-item-label>
                </va-list-item-section>
              </va-list-item>
            </va-list>
          </va-button-dropdown>
          <va-input
            class="mb-4"
            v-model="expressionValue"
            label="Value"
            :rules="[(v) => v >= 0 || `Value must be non-negative`]"
            type="number"
          />
        </va-form>

        <va-form class="search-input-form" v-else>
          <va-input
            class="mb-4"
            v-model="address"
            label="Address"
            type="text"
          />
          <va-input 
            class="mb-4"
            v-model="tokenid"
            label="Token ID"
            type="text"
          />
        </va-form>
      </div>

      <va-button
      gradient
      :disabled="disableSearch || disableSearchInvalidInput" 
      @click="startSearch()"
        >Search</va-button>
    </div>
    <div class="suggestions">
      <div v-if="searchSuggestions.length > 0">
        <va-list>
          <va-list-label>
            Suggested Search:
          </va-list-label>

          <va-list-item v-for="(suggestion, index) in searchSuggestions" :key="index" @click="activateSuggestion(suggestion.collection_name)">
            <va-list-item-section avatar>
              <va-avatar>
                <img :src="suggestion.image_url">
              </va-avatar>
            </va-list-item-section>
            <va-list-item-section>
              <va-list-item-label>
                {{ suggestion.collection_name }}
              </va-list-item-label>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listNfts, listCollections, searchNfts } from "../graphql/queries";
import { fetchNFTs } from "../services/nftScraperService";
export default {
  name: "SearchComponent",
  components: {},
  async mounted() {
    await this.getCollections();
  },
  data() {
    return {
      tokenid: "",
      address: "",
      collectionSlug: "",
      nftName: "",
      generalSearchField: "",
      nfts: [],
      keyUpControl: null,
      salesFilter: {
        'expression': 'gt',
        'value': 0
      },
      expressionOptions: [
        ['Greater Than', 'gt'],
        ['Less Than', 'lt'],
        ['Equal', 'eq']
      ],
      expressionIndex: 0,
      expressionValue: 0,
      collections: [],
      searchTypes: [
        ["Collection Name", "collections"],
        ["Token Name", "generating_tokens"],
        ["Owner", "account_balance_wallet"],
        ["Number of Sales", "palette"],
        ["Focused", "adjust"]
      ],
      searchIndex: 0,
      requestCount: 0,
      disableSearch: false,
    };
  },
  computed: {
    searchType() {
      return this.searchTypes[this.searchIndex][this.searchIndex];
    },
    searchSuggestions() {
      var suggestions = [];
      var suggestionNames = [];
      var generalSearch = this.generalSearchField;
      var collections = this.collections;
      if(this.searchTypes[this.searchIndex][0] === "Collection Name") {
        for(var i = 0; i < collections.length; i++){
          var collection = collections[i];
          if(collection['name'] && !suggestionNames.includes(collection['name']) && collection['name'].toLowerCase().includes(generalSearch.toLowerCase())) {
            suggestions.splice(0, 0, {'collection_name': collection['name'], 'image_url': collection['image_url']});
            suggestionNames.push(collection['name']);
          }
        }
      }
      else {
        if(this.nfts.length > 0) {
          var nfts = this.nfts;
          for(var j = 0; j < nfts.length; j++) {
            var nft = nfts[j];
            if(nft['collection_name'] && !suggestionNames.includes(nft['collection_name'])) {
              var nftCollection = this.collections.filter((col) => col.name === nft['collection_name'])[0];
              suggestions.splice(0, 0, {'collection_name': nftCollection['name'], 'image_url': nftCollection['image_url']});
              suggestionNames.push(nftCollection['name']);
            }
          }
        }
      }
      return suggestions;
    },
    collectionNames() {
      return this.collections.filter(collection => {
        collection['name'];
      });
    },
    disableSearchInvalidInput() {
      if (this.searchTypes[this.searchIndex][0] === "Number of Sales") {
        if (this.expressionValue < 0)
          return true;
      }

      else if (this.searchTypes[this.searchIndex][0] === "Collection Name") {
        if (this.generalSearchField === '')
          return true;
      }

      return false;
    }
  },
  methods: {
    activateSuggestion: async function(suggestion) {
      this.searchIndex = 0;
      this.generalSearchField = suggestion;
      await this.startSearch();
    },
    generalSearch: async function() {
      var searchIndex = this.searchIndex;
      var searchField = '';
      switch (searchIndex) {
        case 0:
          searchField = 'collection_name';
          await this.searchByCollectionName();
          return;
        case 1:
          searchField = 'name';
          break;
        case 2:
          searchField = 'owner';
          break;
        case 3:
          searchField = 'num_sales';
          break;
      }
      var filter = {};
      if(searchField === 'num_sales') {
        var expression = this.expressionOptions.at(this.expressionIndex)[1];
        var value = this.expressionValue;
        filter[searchField] = {};
        filter[searchField][expression] = value;
      }
      else
        filter[searchField] = {beginsWith: this.generalSearchField};
      const results = await API.graphql({
        query: listNfts,
        variables: {
            filter
          },
        },
      );
      this.nfts = results.data.listNfts.items;
      this.$emit("getNFTs", this.nfts);
    },
    targetedSearch: async function(event) {
      try {
        await this.getNFTs();
        if (this.nfts.length === 0) {
          event["searchStatus"] = "Fetching";
          this.$emit("getNFTs", event);
          var response = await fetchNFTs(this.address, this.tokenid);
          if (response.ok) {
            await this.getNFTs();
          }

          if (this.nft === null) {
            await setTimeout(this.getNFTs(), 3000);
          }
        }
      } catch(e) {
        console.error(e);
      }
    },
    startSearch: async function () {
      if (this.disableSearchInvalidInput)
        return;
      this.disableSearch = true;
      var previousTime = this.keyUpControl;
      var now = new Date().getTime();
      if(previousTime !== null && now - previousTime < 300) return;
      this.keyUpControl = now;
      //var response = null;
      var event = {
        searchStatus: "Failure",
        data: [],
        searchType: "",
      };
      event['searchType'] = 'nft';
      if(this.searchIndex === 4) await this.targetedSearch(event);
      else await this.generalSearch();
      if(this.nfts.length > 0) {
        event['searchStatus'] = 'Success';
      } else {
        event['searchStatus'] = 'Failure';
      }
      event['data'] = this.nfts;
      this.$emit('getNFTs', event);
      this.disableSearch = false;
    },
    getNFTs: async function () {
      try {
        this.address = this.address.toLowerCase();
        if (this.tokenid == "") {
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              filter: { address: { eq: this.address } },
            },
          });
          this.nfts = nfts.data.listNfts.items;
          this.$emit("getNFTs", this.nfts);
        } else {
          const nfts = await API.graphql({
            query: searchNfts,
            variables: {
              filter: {
                token_id: { eq: this.tokenid },
                address: { eq: this.address },
              },
            },
          });
          this.nfts = nfts.data.searchNfts.items;
          this.$emit("getNFTs", this.nfts);
        }
      } catch (e) {
        console.error(e);
      }
    },
    getCollections: async function () {
      try {
        const collection = await API.graphql({
          query: listCollections
        });
        this.collections = collection.data.listCollections.items;
        console.log(this.collections);
      } catch (e) {
        console.error(e);
      }
    },
    searchByCollectionName: async function() {
      try {
        var searchTerm = this.generalSearchField;
        for(var i = 0; i < this.collections.length; i++) {
          if (this.collections[i]['name'].toLowerCase().includes(searchTerm.toLowerCase())) {
            const results = await API.graphql({
            query: listNfts,
            variables: {
                filter: {collection_name: {eq: this.collections[i]['name']}}
              },
            });
            this.nfts = results.data.listNfts.items;
            this.$emit("getNFTs", this.nfts);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
}
.search-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-item-list {
  padding: 1em;
  background-color: rgba(0, 0, 0, 0.1);
}
.search-item:hover {
  cursor: pointer;
  background-color: #6f36bc;
  transition: ease-in 0.1s;
}
.search-input-form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-alert {
  color: white;
}
.va-input-wrapper {
  margin-bottom: 0 !important;
}
.va-alert__content {
  display: flex;
  flex-direction: row;
}
.post {
  background: #fff;
  padding: 1.5em;
}
.post h2 {
  font-size: 1.3em;
  padding-bottom: 0.25rem;
}
.post p {
  color: #888;
}
.container {
  justify-items: stretch;
  width: 83.5%;
}
.rounded-card {
  border-radius: 5px;
}
.is-purple {
  color: #6f36bc;
}
.background {
  background-color: transparent;
}
.suggestions {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 50%;
  border-radius: 15px;
}
.va-list-item-label {
  overflow: none !important;
}
</style>
