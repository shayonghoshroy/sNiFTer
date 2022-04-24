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
            @click="{ searchIndex = index; generalSearchField = ''; }"
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
            :rules="[(v) => v.length > 0 || `Must provide value for search`]"
            placeholder="Required"
          />
        </va-form>
        <va-form @keyup="startSearch()" class="search-input-form" v-else-if="searchIndex === 2">
          <va-input
            class="mb-4"
            v-model="generalSearchField"
            label="Address"
            :rules="[(v) => v.length > 0 || `Must provide value for search`]"
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

        <va-form @keyup="startSearch()" class="search-input-form" v-else>
          <va-input
            class="mb-4"
            v-model="generalSearchField"
            label="Address"
            :rules="[(v) => v.length > 0 || `Must provide value for search`]"
            type="text"
          />
          <va-input @keyup="startSearch()"
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
import { listNfts, listCollections } from "../graphql/queries";

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
      lastSearch: ''
    };
  },
  computed: {
    searchType() {
      return this.searchTypes[this.searchIndex][this.searchIndex];
    },
    searchSuggestions() {
      debugger;
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
      return suggestions.slice(0, 5);
    },
    collectionNames() {
      return this.collections.filter(collection => {
        collection['name'];
      });
    },
    disableSearchInvalidInput() {
      var searchType = this.searchTypes[this.searchIndex][0];
      console.log(this.searchTypes[this.searchIndex]);
      if (searchType === "Number of Sales") {
        if (this.expressionValue < 0)
          return true;
      }

      else if (["Collection Name", "Token Name", "Owner", "Focused"].includes(searchType)) {
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
      else filter[searchField] = {beginsWith: this.generalSearchField};
      const results = await API.graphql({
        query: listNfts,
        limit: 1000000,
        variables: {
            filter
          },
        },
      );
      this.nfts = results.data.listNfts.items;
      this.$emit("getNFTs", this.nfts);
    },
    targetedSearch: async function() {
      try {
        await this.getNFTs();
      } catch(e) {
        console.error(e);
      }
    },
    startSearch: async function () {
      if (this.disableSearchInvalidInput)
        return;
      this.disableSearch = true;

      var event = {
        searchStatus: "Failure",
        data: [],
        searchType: "",
      };
      console.log(this.generalSearchField);
      event['searchType'] = 'nft';
      if(this.searchIndex === 4) await this.targetedSearch();
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
        this.generalSearchField = this.generalSearchField.toLowerCase();
        var address = this.generalSearchField;
        if (this.tokenid == "") {
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 1000000,
              filter: { id: { beginsWith: address } },
            },
          });

          var nftItems = nfts.data.listNfts.items;
          this.nfts = nftItems;
          this.$emit("getNFTs", this.nfts);
        } else {
          var token_id = this.tokenid;
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 1000000,
              filter: {
                address: { beginsWith: address },
              },
            },
          });

          var results = nfts.data.listNfts.items;
          results = results.filter((nft) => {
            var token_id_str = '' + token_id;
            var item_token_id = '' + nft.token_id;
            console.log(token_id_str, item_token_id);
            return item_token_id.substring(0, token_id_str.length) === token_id_str;
          });
          this.nfts = results;
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
            const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 1000000,
                filter: {collection_name: {eq: this.collections[i]['name']}}
              },
            });

            this.nfts = nfts.data.listNfts.items;
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
