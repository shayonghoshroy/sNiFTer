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

          <va-list-item v-for="(suggestion, index) in searchSuggestions" :key="index" @click="activateSuggestion(suggestion)">
            <va-list-item-section avatar>
              <va-avatar>
                <img :src="suggestion.image_url">
              </va-avatar>
            </va-list-item-section>
            <va-list-item-section>
              <va-list-item-label>
                {{ suggestion.name }}
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
      // Determine the suggested search options as user types
      var suggestions = [];
      var suggestionNames = [];
      var generalSearch = this.generalSearchField;
      var collections = this.collections;
      // If searching by collection, set collection suggestions
      if(this.searchTypes[this.searchIndex][0] === "Collection Name") {
        for(var i = 0; i < collections.length; i++){
          var collection = collections[i];
          if(collection['name'] && !suggestionNames.includes(collection['name']) && collection['name'].toLowerCase().includes(generalSearch.toLowerCase())) {
            suggestions.splice(0, 0, {'name': collection['name'], 'image_url': collection['image_url']});
            suggestionNames.push(collection['name']);
          }
        }
      }
      else {
        // If NFTs exist
        if(this.nfts.length > 0) {
          var nfts = this.nfts;
          // Parse through to determine suggestions
          for(var j = 0; j < nfts.length; j++) {
            var nft = nfts[j];

            var searchType = this.searchTypes[this.searchIndex][0];
            var searchField = '';
            
            // Set Search Field to the nft paramter
            if(searchType === "Token Name") {
              searchField = 'name';
            } else if(searchType === "Owner") {
              searchField = 'owner';
            } else if(searchType === "Number of Sales") {
              searchField = 'num_sales';
            } else if(searchType === "Focused") {
              searchField = 'id';
            }

            // If the field exists, and has not been included yet
            if(nft[searchField] && !suggestionNames.includes(nft[searchField])) {
              // Include operator sign when searching by sales
              if(searchField === 'num_sales') {
                var value = nft[searchField];
                var expressionType = this.expressionOptions[this.expressionIndex][1];
                if(expressionType === "gt") {
                  value = '> ' + (value - 1);
                } else if(expressionType === "lt") {
                  value = '< ' + (value + 1);
                } else {
                  value = "= " + value;
                }

                // Add to suggestions, and suggestion Names
                suggestions.splice(0, 0, {'name': value, 'image_url': nft['image_url']});
                suggestionNames.push(nft[searchField]);
              } else if(searchType === "Focused") {
                var id = nft[searchField];
                var address = id.split("-")[0];

                // If not token ID, search by address, otherwise search by address and token_id
                if(this.tokenid === "") {
                  if(!suggestionNames.includes(address)) {
                    // Add to suggestions, and suggestion Names
                    suggestions.splice(0, 0, {'name': address, 'image_url': nft['image_url']});
                    suggestionNames.push(address);
                  }
                } else {
                  // Add to suggestions, and suggestion Names
                  suggestions.splice(0, 0, {'name': nft[searchField], 'image_url': nft['image_url']});
                  suggestionNames.push(nft[searchField]);
                }
              } 
              else {
                // Add to suggestions, and suggestion Names
                suggestions.splice(0, 0, {'name': nft[searchField], 'image_url': nft['image_url']});
                suggestionNames.push(nft[searchField]);
              }
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
      // Disable search if invalid values
      var searchType = this.searchTypes[this.searchIndex][0];
      
      // Number of sales should be > 0
      if (searchType === "Number of Sales") {
        if (this.expressionValue < 0)
          return true;
      }

      // Search should not be empty
      else if (["Collection Name", "Token Name", "Owner", "Focused"].includes(searchType)) {
        if (this.generalSearchField === '')
          return true;
      }

      return false;
    }
  },
  methods: {
    activateSuggestion: async function(suggestion) {
      /**
       * Perform search when suggestion is clicked
       */
      var searchType = this.searchTypes[this.searchIndex][0];
      var value = suggestion['name'];

      // Format as {address} or {address}-{token_id} for Focused
      if(searchType === "Focused") {
        if(this.tokenid === "") {
          this.generalSearchField = value;
        } else {
          var [address, token_id] = value.split("-");
          this.generalSearchField = address;
          this.tokenid = token_id;
        }
      } else if(searchType === "Number of Sales") { 
        this.expressionValue = parseInt(value.substring(value.indexOf(" ") + 1, value.length));
      } else{
        this.generalSearchField = suggestion['name'];
      }
      await this.startSearch();
    },
    generalSearch: async function() {
      var searchIndex = this.searchIndex;
      var searchField = '';

      // Set proper search fields
      switch (searchIndex) {
        case 0:
          searchField = 'collection_name';
          // Perform collection name search
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

      // Format filter for number of sales
      if(searchField === 'num_sales') {
        var expression = this.expressionOptions.at(this.expressionIndex)[1];
        var value = this.expressionValue;
        filter[searchField] = {};
        filter[searchField][expression] = value;
      }

      // Format general filter
      else filter[searchField] = {beginsWith: this.generalSearchField};

      // Query for match
      const results = await API.graphql({
        query: listNfts,
        limit: 1000000,
        variables: {
            filter
          },
        },
      );

      // Set results
      this.nfts = results.data.listNfts.items;

      // Emit results to search page
      this.$emit("getNFTs", this.nfts);
    },
    targetedSearch: async function() {
      /*
      * Perform search for Focused field
      */
      try {
        await this.getNFTs();
      } catch(e) {
        console.error(e);
      }
    },
    startSearch: async function () {
      /**
       * Coordinate and perform search
       */

      // Do nothing if invalid search
      if (this.disableSearchInvalidInput)
        return;

      // Turn off search to disallow spam
      this.disableSearch = true;

      // Assume failed search result, update values if success
      var event = {
        searchStatus: "Failure",
        data: [],
        searchType: "",
      };
      
      // Set what type of item is being searched
      event['searchType'] = 'nft';

      // Perform targeted search in its own method, otherwise general search
      if(this.searchIndex === 4) await this.targetedSearch();
      else await this.generalSearch();

      // Set success/fail result
      if(this.nfts.length > 0) {
        event['searchStatus'] = 'Success';
      } else {
        event['searchStatus'] = 'Failure';
      }

      // Set data and emit to search page
      event['data'] = this.nfts;
      this.$emit('getNFTs', event);

      // Enable search again
      this.disableSearch = false;
    },
    getNFTs: async function () {
      /*
       * Used for focused search
       */
      try {

        // Format to lower case address
        this.generalSearchField = this.generalSearchField.toLowerCase();
        var address = this.generalSearchField;

        // If no token id, check if id matches address
        if (this.tokenid == "") {
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 1000000,
              filter: { id: { beginsWith: address } },
            },
          });

          // Set items and emit result to search page
          var nftItems = nfts.data.listNfts.items;
          this.nfts = nftItems;
          this.$emit("getNFTs", this.nfts);
        } else {

          // If token id is provided, match by address and filter by token id
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

          // Filter results for matching token ids
          var results = nfts.data.listNfts.items;
          results = results.filter((nft) => {
            var token_id_str = '' + token_id;
            var item_token_id = '' + nft.token_id;
            return item_token_id.substring(0, token_id_str.length) === token_id_str;
          });

          // Set data and emit to search page
          this.nfts = results;
          this.$emit("getNFTs", this.nfts);
        }
      } catch (e) {        
        //console.error(e);
      }
    },
    getCollections: async function () {
      /**
       * Fetch all collections for collection name searches
       */
      try {
        const collection = await API.graphql({
          query: listCollections
        });
        this.collections = collection.data.listCollections.items;
      } catch (e) {
        //console.error(e);
      }
    },
    searchByCollectionName: async function() {
      /**
       * Perform collection name search
       */
      try {
        var searchTerm = this.generalSearchField;
        // Parse through and determine if collection name matches
        for(var i = 0; i < this.collections.length; i++) {

          // Check if collection name matches search value
          if (this.collections[i]['name'].toLowerCase().includes(searchTerm.toLowerCase())) {
            const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 1000000,
                filter: {collection_name: {eq: this.collections[i]['name']}}
              },
            });

            // Set NFT data
            this.nfts = nfts.data.listNfts.items;

            // Emit results to search page
            this.$emit("getNFTs", this.nfts);
          }
        }
      } catch (error) {
        //console.log(error);
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
