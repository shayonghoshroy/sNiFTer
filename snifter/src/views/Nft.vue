<template>
  <div class="nft-container">
    <div>
      <va-card :src="nft" class="nft-card" style="width: 800px">
          <div class="tester">
            <div>
              <va-image
                  class="rounded-card"
                  :src="nft.image_url"
                  style="height: 250px; width: 250px"
              />
            </div>
            <div>
              <va-list>
                <va-list-item class="info-item" v-if="collection">
                  <va-list-item-section>
                    {{ collection.name }}
                  </va-list-item-section>
                  <va-list-item-section>
                    <img :src="collection.image_url" alt="Collection Logo" style="height: 50px; width: 50px">
                  </va-list-item-section>
                </va-list-item>

                <va-list-item class="info-item">
                  <va-list-item-section>
                    #{{ nft.token_id }}
                  </va-list-item-section>
                  <va-list-item-section>
                    {{ nft.owner || 'UNKNOWN OWNER' }}
                  </va-list-item-section>
                </va-list-item>

                <va-list-item class="list-interactable">
                  <va-list-item-section>
                    <va-list-item-label>
                      Current Bid:
                    </va-list-item-label>
                  </va-list-item-section>
                  <va-list-item-section>
                    23.4
                  </va-list-item-section>
                </va-list-item>

                <va-list-item class="list-interactable">
                  <va-list-item-section>
                    <va-list-item-label>
                      Add To Watchlist
                    </va-list-item-label>
                  </va-list-item-section>
                  <va-list-item-section icon>
                      <div>
                        <va-icon
                            name="add"
                            color="#6f36bc"
                        ></va-icon>
                      </div>
                  </va-list-item-section>
                </va-list-item>

                <va-list-item class="list-interactable">
                  <va-list-item-section>
                    <va-list-item-label>
                      Price Trends
                    </va-list-item-label>
                  </va-list-item-section>
                </va-list-item>
              </va-list>
            </div>
          </div>

          <va-card-title v-if="nft.name">{{ nft.name }}</va-card-title>
          <va-card-title v-else></va-card-title>

          <va-card-content>
              {{ nft.name }} {{ nft.token_id }}
          </va-card-content>

          <va-collapse
          v-model="showContract"
          header="Contract Information">
            <contract-stats
            :contracts="nftContract">
            </contract-stats>
          </va-collapse>
          <va-collapse
          v-model="showCollection"
          v-if="collection"
          header="Collection Information">
            <collection-info
            :collection="collection">
            </collection-info>
          </va-collapse>
      </va-card>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listCollections, listNftAssetContracts } from "../graphql/queries";
import ContractStats from "../components/ContractInfo";
import CollectionInfo from "../components/nft/CollectionInfo";

export default {    
  name: "Nft",
  components: {
    ContractStats,
    CollectionInfo
  },
  async created(){
    console.log(this.$route.query);
    this.nftData = this.$route.query;

    await this.getNFTs(this.nftData.address);
    console.log(this.nftContract);
    console.log(this.collection);
  },
  data() {
    return {
        nftData: null,
        showContract: false,
        showCollection: false,
        collapses: [
          { title: 'Contract', content: 'first collapse content' },
        ],
        nftContract: [],
        collection: null
    }
  },
  computed: {
      nft() {
        return this.nftData;
      }
  },
  methods: {
    async getNFTs(address) {
        console.log("fetching");
        try {
            const contracts = await API.graphql({
                query: listNftAssetContracts,
                variables: {
                filter: {address: {eq: address}}
                },
            });
            this.nftContract = contracts.data.listNftAssetContracts.items;

            // Convert Proxy object returned by query into JS object to access slug
            var currentContract = JSON.parse(JSON.stringify(this.nftContract)).at(0);

            // Query collections for matching slug
            const collection = await API.graphql({
                query: listCollections,
                variables: {
                filter: {slug: {eq: currentContract.slug}}
                },
            });
            
            // There should only be one collection for each contract
            this.collection = JSON.parse(JSON.stringify(collection.data.listCollections.items)).at(0);
        } catch (e) {
            console.error(e);
        }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.tester {
  display: flex;
  justify-content: flex-start;
}

.info-item {
  color: white;
}

.list-interactable {
  background-color: white;
  color: black;
  margin: 1em;
}

.nft-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nft-card {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: #6f36bc !important;
}
h1 {
  margin-top: 1em;
  text-align: center;
}
.description {
  width: 60vw;
}

.contract-table > tr > td {
    padding-bottom: 1em;
}

@media (max-width: 700px) {
  div {
    padding: 4em 0em;
  }
  .description {
    text-align: justify;
    width: 90vw;
  }
}
</style>