<template>
  <div class="nft-container-wrapper">
    <div class="nft-container" :class="nft?.background_color ? 'nft-background-color' : 'nft-default-background'">
      <div v-if="nft" :src="nft" class="nft-card">
        <div class="top-row">
          <div class="nft-image-wrapper">
            <div class="nft-header">
              <h1 v-if="nft.name">
                {{ nft.name }}
              </h1>
              <h1 v-else-if="currentContract">
                {{ currentContract.name + ' #' + nft.token_id }}
              </h1>
            </div>
            <va-image
                class="rounded-card nft-image"
                :src="nft.image_url"
                style="height: 500px; width: 500px"
            />
            <div class="nft-interactions">
              <div class="nft-stub">
                <div class="nft-icon">
                  <va-icon
                  v-if="hasFavorited"
                  name="favorite"
                  size="large"
                  @click="favorite(this.user, nft.id)"
                  ></va-icon>
                  <va-icon
                  v-else
                  name="favorite_border"
                  size="large"
                  @click="favorite(this.user, nft.id)"></va-icon>
                </div>
              </div>
              <p>{{ this.totalFavorites }}</p>
            </div>
          </div>

          <div class="nft-traits">
            <va-accordion v-model="showNftAccordion" class="nft-traits-accordion">
              <va-collapse
                v-for="(collapse, index) in nftCollapses"
                :key="index"
                :header="collapse.title"
              >
                <div v-if="collapse.title === 'Ownership'" class="nft-ownership">
                  <EntityCardList 
                    v-if="entityListData"
                    :entities="entityListData" />
                </div>
                <div v-else-if="collapse.title === 'Traits'" style="width: 100%;">
                  <TraitTable 
                    v-if="nft.traits && currentContract?.total_supply"
                    :traits="nft.traits"
                    :totalSupply="currentContract.total_supply"
                  />
                </div>
              </va-collapse>
            </va-accordion>
          </div>

          <!-- <div class="nft-ownership">
            <va-list class="nft-ownership-list">
              <va-list-item class="info-item" v-if="collection">
                <va-list-item-section>
                  {{ collection.name }}
                </va-list-item-section>
                <va-list-item-section>
                  {{ collection.symbol }}
                </va-list-item-section>
                <va-list-item-section>
                  <img :src="collection.image_url" alt="Collection Logo" style="height: 50px; width: 50px">
                </va-list-item-section>
              </va-list-item>
              <va-list-item v-if="currentContract">
                <p>
                  {{ currentContract.name }}
                </p>
              </va-list-item>
              <va-list-item>
                <p v-if="nft.name">{{ nft.name }}</p>
                <p v-else>No Name</p>
              </va-list-item>
              <va-list-item class="info-item">
                <va-list-item-section>
                  Owned By:
                </va-list-item-section>
                <va-list-item-section>
                  {{ nft.owner || 'UNKNOWN OWNER' }}
                </va-list-item-section>
              </va-list-item>
            </va-list>
          </div> -->
        </div>

          <div class="transaction-section">
            <div class="recent-sales-info">
              <div class="recent-info">
                <va-list>
                  <va-list-item>
                    <va-list-item-section>
                      <p>Current Bid: </p>
                    </va-list-item-section>
                    <va-list-item-section>
                      <p>3 eth</p>
                    </va-list-item-section>
                  </va-list-item>
                  <va-list-item>
                    <va-list-item-section>
                      <p>Last Sale: </p>
                    </va-list-item-section>
                    <va-list-item-section>
                      <p>2.5 eth</p>
                    </va-list-item-section>
                  </va-list-item>
                  <va-list-item>
                    <va-list-item-section>
                      <p>Average Sale: </p>
                    </va-list-item-section>
                    <va-list-item-section>
                      <p>2.75 eth</p>
                    </va-list-item-section>
                  </va-list-item>
                </va-list>
              </div>
              <div class="total-info">
                <va-list>
                  <va-list-item>
                    <va-list-item-section>
                      <p>Number of Sales:</p>
                    </va-list-item-section>
                    <va-list-item-section>
                      <p>{{ nft.num_sales }}</p>
                    </va-list-item-section>
                  </va-list-item>
                  <va-list-item>
                    <va-list-item-section>
                      <p>Total Sales:</p>
                    </va-list-item-section>
                    <va-list-item-section>
                      <p>27.5 eth</p>
                    </va-list-item-section>
                  </va-list-item>
                </va-list>
              </div>
            </div>
            <div v-if="nftEvents.length > 0">
              <va-accordion v-model="showTransactions">
                <va-collapse
                header="Transactions">
                  <TransactionTable 
                    :nftEvents="nftEvents"
                  />
                </va-collapse>
              </va-accordion>
            </div>
          </div>

          <div class="contract-section">
            <contract-stats
              :contracts="nftContract">
            </contract-stats>
          </div>

          <div class="collection-section">
            <CollectionInfo :collection="collection" />
          </div>
      </div>
    </div>
  </div>
  
</template>
<script>

import { API } from "aws-amplify";
import { listCollections, listNftAssetContracts, listNfts, listNftEvents, listUserFavoriteNft } from "../graphql/queries";
import { fetchCollection } from '../services/nftScraperService';
import { createUserFavoriteNft, deleteUserFavoriteNft } from '../graphql/mutations';
import ContractStats from "../components/ContractInfo";
import CollectionInfo from "../components/nft/CollectionInfo";
import TraitTable from "../components/nft/TraitTable";
import EntityCardList from "../components/nft/EntityCardList";
import TransactionTable from "../components/nft/TransactionTable.vue"

export default {
  name: "Nft",
  components: {
    ContractStats,
    CollectionInfo,
    TraitTable,
    EntityCardList,
    TransactionTable
  },
  async created() {
    console.log(this.$route.query);
    this.nftData = this.$route.query;

    await this.getNFT();
    console.log(this.nft);
    await this.getNFTs(this.nftData.address);

    if(this.collection === null || this.collection === undefined) {
      await this.collectionRequest(this.currentContract.slug);
    }

    var nextToken = await this.getNFTEvents(this.nft.address, this.nft.token_id);
    while (nextToken)
      nextToken = await this.getNFTEvents(this.nft.address, this.nft.token_id, nextToken);

    console.log(this.nftContract);
    console.log(this.collection);
    console.log(this.nftEvents, "NFTEVENTS");

    this.setFavoriteStatus(this.user, this.nftData.id);
    this.setTotalFavorites(this.nftData.id);
  },
  data() {
    return {
        nftData: null,
        nft: null,
        showContract: false,
        showCollection: false,
        showTransactions: false,
        nftCollapses: [
          { title: 'Ownership' },
          { title: 'Traits' },
        ],
        nftContract: [],
        currentContract: null,
        collection: null,
        nftEvents: [],
        showNftAccordion: [false, false],
        hasFavorited: false,
        totalFavorites: null,
        user: "shayon"
    }
  },
  computed: {
    traitColumnFields() {
      return ['type', 'value', 'count', 'rarity']
    },
    entityListData() {
      var entities = [];

      if(this.collection) {
        entities.push({
          'type': 'Collection', 'name': this.collection.name, 'image_url': this.collection.image_url
        });
      }

      if(this.currentContract) {
        entities.push({
          'type': 'Contract', 'name': this.currentContract.name, 'image_url': this.currentContract.image_url
        });
      }

      if(this.nft.owner && this.currentContract) {
        entities.push({
          'type': 'Owner', 'name': this.nft.owner, 'image_url': this.currentContract.image_url
        });
      }

      console.log(entities);

      return entities;
    }
  },
  methods: {
    async initSubscriptions() {
      
    },
    async getNFT() {
      try {
        var token_id = this.nftData.token_id;
        var address = this.nftData.address;

        const nfts = await API.graphql({
          query: listNfts,
          variables: {
            filter: {
              address: {eq: address},
              token_id: {eq: token_id}
            }
          }
        });

        this.nft = nfts.data.listNfts.items.at(0);
      }
      catch(error) {
        console.log(error);
        return null;
      }
    },
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
            this.currentContract = currentContract;
            console.log(currentContract);

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
    },
    async getCollection(collectionSlug) {
        // Query collections for matching slug
        try {
          const collection = await API.graphql({
              query: listCollections,
              variables: {
              filter: {slug: {eq: collectionSlug}}
              },
          });
          
          // There should only be one collection for each contract
          this.collection = JSON.parse(JSON.stringify(collection.data.listCollections.items)).at(0);
        }
        catch(error) {
          console.log(error);
        }
    },
    async collectionRequest(collectionSlug) {
      console.log("Fetching...");
      var response = await fetchCollection(collectionSlug);
      if(response.ok) {
        await this.getCollection();
      }
    },
    async getNFTEvents(contractAddress, tokenId, nextToken = null) {
      const nftEvents = await API.graphql({
              query: listNftEvents,
              variables: {
                nextToken: nextToken,
                filter: {
                  contract_address: {eq: contractAddress},
                  token_id: {eq: tokenId}
                }
              },
          });

      this.nftEvents = this.nftEvents.concat(nftEvents.data.listNftEvents.items);
      return nftEvents.data.listNftEvents.nextToken;
    },
    async setTotalFavorites(nftID) {
      try {
        const count = await API.graphql({
          query: listUserFavoriteNfts,
          variables: {
            filter: {nftID: {eq: nftID}}
          }
        });
        this.totalFavorites = Object.keys(count.data.listUserFavoriteNfts.items).length
      } catch (e) {
        console.error(e);
      }
    },
    async setFavoriteStatus(userID, nftID) {
      try {
        const has_favorited = await API.graphql({
          query: listUserFavoriteNfts,
          variables: {
            filter: {userID: {eq: userID}, nftID: {eq: nftID}}
          }
        });

        if (typeof has_favorited.data.listUserFavoriteNfts.items[0] !== "undefined") {
          this.hasFavorited = true;
        } else {
          this.hasFavorited = false;
        }
      } catch (e) {
        console.error(e);
      }
    },
    // if user has favorited, remove favorite
    // else add favorite
    async favorite(userID, nftID) {
      this.hasFavorited = !this.hasFavorited;
      try {
        const has_favorited = await API.graphql({
          query: listUserFavoriteNfts,
          variables: {
            filter: {userID: {eq: userID}, nftID: {eq: nftID}}
          }
        });

        if (typeof has_favorited.data.listUserFavoriteNfts.items[0] !== "undefined") {
          const userFavoriteNftId = {id: has_favorited.data.listUserFavoriteNfts.items[0].id};
          console.log('removing favorite');
          this.totalFavorites -= 1;
   
          await API.graphql({
            query: deleteUserFavoriteNft,
            variables: {input: userFavoriteNftId},
          });
        } else {
          console.log('adding favorite');
          this.totalFavorites += 1;
     
          const userFavoriteNft = {userID, nftID};
          await API.graphql({
            query: createUserFavoriteNft,
            variables: {input: userFavoriteNft},
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.flex-container {
  display: flex;
  /*align-items: center;*/
  justify-content: center;
}

.tester {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.top-row {
  display: flex;
  justify-content: flex-start;
  border-bottom: solid black 1px;
  width: 100%;
  max-height: 800px;
}

.nft-image-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em 0 1em 2em;
}

.nft-image {
  border: solid black 1px;
  border-radius: 15%;
}

.nft-ownership {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  padding-left: 0;
}

.nft-ownership-list {
  padding: 0;
}

.nft-header {
  margin-bottom: 1em;
  font-size: 2rem;
}

.nft-interactions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 75%;
  padding: 1em 0 1em 0;
}

.nft-interaction-icon:hover {
  cursor: pointer;
}

.transaction-section {
  width: 100%;
  border-bottom: solid black 1px;
}

.recent-sales-info {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.list-interactable {
  color: black;
  margin: 1em;
}

.contract-section {
  width: inherit;
  margin: 0 2em 0 2em;
  border-bottom: solid black 1px;
}

.nft-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 16em;
  padding-right: 16em;
}

.nft-card {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border: solid black 1px;
  border-radius: 2rem;
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

.tweet-component {
  overflow: scroll;
  overflow-x: hidden;
  padding-bottom: 2em;
  margin-top: 2em;
  margin-bottom: 4em;
}

.nft-traits {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8em;
  width: 100%;
}

.nft-traits-accordion {
  width: 100%;
}

@media (max-width: 700px) {
  div {
    padding: 4em 0em;
  }
  .description {
    text-align: justify;
    width: 90vw;
  }
  .top-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.nft-icon {
  display: inline-block;
  margin-left: 1em;
}

.nft-icon:hover {
  cursor: pointer;
  color: red;
}

</style>