<template>
  <div class="searchComponent">
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
        <va-form class="search-input-form" v-if="searchIndex === 0">
          <va-input
            class="mb-4"
            v-model="collectionSlug"
            label="Collection Slug"
            placeholder="Required"
          />
        </va-form>
        <va-form class="search-input-form" v-else-if="searchIndex === 1">
          <va-input
            class="mb-4"
            v-model="address"
            label="Address"
            placeholder="Required"
          />
          <va-input
            class="mb-4"
            v-model="tokenid"
            :rules="[(v) => !isNaN(v)] || `Token ID must be a number`"
            label="Token ID"
            placeholder="Optional"
          />
        </va-form>

        <va-form class="search-input-form" v-else>
          <va-input
            class="mb-4"
            v-model="address"
            label="Address"
            placeholder="Required"
          />
        </va-form>
      </div>

      <va-button :disabled="disableSearch" @click="startSearch()"
        >Search</va-button
      >
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listNfts, listCollections } from "../graphql/queries";
import { fetchCollection, fetchNFTs } from "../services/nftScraperService";

export default {
  name: "SearchComponent",
  components: {},
  data() {
    return {
      tokenid: "",
      address: "",
      collectionSlug: "",
      nfts: [],
      collections: [],
      searchTypes: [
        ["Collection", "collections"],
        ["Token", "generating_tokens"],
        ["Owner", "account_balance_wallet"],
        ["Creator", "palette"],
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
  },
  methods: {
    startSearch: async function () {
      this.disableSearch = true;
      var response = null;
      var event = {
        searchStatus: "Failure",
        data: [],
        searchType: "",
      };

      // Collection search
      try {
        if (this.searchIndex === 0) {
          event["searchType"] = "collection";

          await this.getCollection();
          debugger;

          // Fetch collecton from API
          if (this.collections.length === 0) {
            event["searchStatus"] = "Fetching";
            this.$emit("getNFTs", event);

            response = await fetchCollection(this.collectionSlug);

            // Successful search
            if (response.ok) {
              debugger;
              await this.getCollection();

              event["data"] = this.collections;
              if (this.collections.length > 0) {
                event["searchStatus"] = "Success";
              }
            } else {
              event["searchStatus"] = "Failure";
            }

            this.$emit("getNFTs", event);
          }

          // Already in database
          else {
            event["searchStatus"] = "Success";
            event["data"] = this.collections;
            console.log(this.collections);
            this.$emit("getNFTs", event);
          }
        }

        // NFT or Contract Search
        else if (this.searchIndex === 1) {
          event["searchType"] = "nft";
          await this.getNFTs();

          if (this.nfts.length === 0) {
            event["searchStatus"] = "Fetching";
            this.$emit("getNFTs", event);

            response = await fetchNFTs(this.address, this.tokenid);
            debugger;
            if (response.ok) {
              await this.getNFTs();

              event["data"] = this.nfts;
              if (this.nfts.length > 0) {
                event["searchStatus"] = "Success";
              }
            } else {
              event["searchStatus"] = "Failure";
            }

            this.$emit("getNFTs", event);
          } else {
            event["searchStatus"] = "Success";
            event["data"] = this.nfts;
            this.$emit("getNFTs", event);
          }
        }
      } catch (e) {
        event["searchStatus"] = "Failure";
        this.$emit(event);
      }

      this.disableSearch = false;
    },
    getNFTs: async function () {
      try {
        console.log("Starting Query");
        this.address = this.address.toLowerCase();
        if (this.tokenid == "") {
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 300,
              filter: { address: { eq: this.address } },
            },
          });
          this.nfts = nfts.data.listNfts.items;
          this.$emit("getNFTs", this.nfts);
        } else {
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 300,
              filter: {
                token_id: { eq: this.tokenid },
                address: { eq: this.address },
              },
            },
          });
          this.nfts = nfts.data.listNfts.items;
          this.$emit("getNFTs", this.nfts);
        }
      } catch (e) {
        console.error(e);
      }
    },
    getCollection: async function () {
      try {
        console.log("Starting Query");
        this.collectionSlug = this.collectionSlug.toLowerCase();
        debugger;
        const collection = await API.graphql({
          query: listCollections,
          variables: {
            filter: { slug: { eq: this.collectionSlug } },
          },
        });
        this.collections = collection.data.listCollections.items;
      } catch (e) {
        console.error(e);
      }
    },
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

.search-item-list {
  padding: 1em;
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
.is-white {
  color: #ffffff;
}
</style>
