<template>
  <div class="nft-container-wrapper">
    <div
      class="nft-container"
      :class="
        nft?.background_color
          ? 'nft-background-color'
          : 'nft-default-background'
      "
    >
      <div v-if="nft" :src="nft" class="nft-content background">
        <!-- Top row of nft card -->
        <div class="top-row">
          <!-- Leftmost section of nft card -->
          <div class="nft-image-wrapper">
            <div class="nft-header">
              <h1 v-if="nft.name">
                {{ nft.name }}
              </h1>
              <h1 v-else-if="nft.collection_name && nft.token_id">
                {{ nft.collection_name + " #" + nft.token_id }}
              </h1>
              <div class="rating" style="display: flex;">
                <div class="rating-stars" v-for="i in parseInt(10)" :key="i">
                  <va-icon
                  v-if="i <= averageRating"
                  name="star"
                  />
                  <va-icon
                  v-else
                  name="star_border"
                  />
                </div>
              </div>
            </div>
            <va-image
              class="rounded-card nft-image"
              :src="nft.image_url"
              style="height: 500px; width: 500px"
            />
            <div class="nft-interactions">
              <div class="nft-stub">
                <div class="watchlist-icon">
                  <va-icon
                    v-if="isWatching"
                    name="bookmark"
                    size="large"
                    @click="watch(this.user, nft.id)"
                  ></va-icon>
                  <va-icon
                    v-else
                    name="bookmark_border"
                    size="large"
                    @click="watch(this.user, nft.id)"
                  ></va-icon>
                </div>
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
                    @click="favorite(this.user, nft.id)"
                  ></va-icon>
                  <div id="container">
                    <p class="right">{{ this.totalFavorites }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Accordian section -->
          <div class="nft-traits">
            <va-accordion
              v-model="showNftAccordion"
              class="nft-traits-accordion"
            >
              <va-collapse
                v-for="(collapse, index) in nftCollapses"
                :key="index"
                :header="collapse.title"
              >
                <div
                  v-if="collapse.title === 'Ownership'"
                  class="nft-ownership"
                >
                  <EntityCardList
                    v-if="entityListData"
                    :entities="entityListData"
                  />
                </div>
                <div v-else-if="collapse.title === 'Traits'">
                  <TraitTable
                    v-if="nft && totalSupply"
                    :id="nft.id"
                    :totalSupply="totalSupply"
                  />
                </div>
              </va-collapse>
            </va-accordion>
          </div>
        </div>

        <div v-if="loadingStatus === 'complete'" style="width: 100%;">
          <div class="transaction-section">
            <h1>Transactions</h1>
            <div class="recent-sales-info">
              <div class="sale-info">
                <div class="va-table-responsive">
                  <table class="va-table sales-table">
                    <thead>
                      <tr>
                        <th>Bid Stats</th>
                        <th>Eth</th>
                        <th>Sales Stats</th>
                        <th>Eth</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Total Bids</td>
                        <td>{{ transactionStats['total_bids'] }}</td>
                        <td>Total Sales</td>
                        <td>{{ transactionStats['total_sales'] }}</td>
                      </tr>
                      <tr>
                        <td>Last Bid</td>
                        <td>{{ transactionStats['last_bid'] }}</td>
                        <td>Last Sale</td>
                        <td>{{ transactionStats['last_sale'] }}</td>
                      </tr>
                      <tr>
                        <td>Highest Bid</td>
                        <td>{{ transactionStats['highest_bid'] }}</td>
                        <td>Highest Sale</td>
                        <td>{{ transactionStats['highest_sale'] }}</td>
                      </tr>
                      <tr>
                        <td>Average Bid</td>
                        <td>{{ transactionStats['average_bid'] }}</td>
                        <td>Average Sale</td>
                        <td>{{ transactionStats['average_sale'] }}</td>
                      </tr>
                      <tr>
                        <td>Bid Volume</td>
                        <td>{{ transactionStats['bid_volume'] }}</td>
                        <td>Sales Volume</td>
                        <td>{{ transactionStats['sales_volume'] }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <va-accordion v-model="showTransactions">
              <va-collapse header="Transactions">
                <div v-if="nftEvents && nftEvents.length > 0">
                  <va-button-toggle 
                  v-model="transactionDisplayState"
                  :options="transactionDisplay"
                  />
                  <TransactionTable v-if="transactionDisplayState === 'table'" :nftEvents="nftEventItems" />
                  <TransactionChart v-else :nftEvents="nftEventItems" />
                </div>
                <div v-else>
                  <h1>No bids or sales provided from OpenSea</h1>
                </div>
              </va-collapse>
            </va-accordion>
          </div>
        </div>

        <div v-else-if="loadingStatus === 'fetching'">
          <va-card style="width: 80%">
            <va-card-content>
              <p>Loading Transactions...</p>
              <va-progress-circle indeterminate />
            </va-card-content>
          </va-card>
        </div>

        <div v-else-if="loadingStatus === 'writing'">
          <va-card>
            <va-card-content>
              <va-progress-circle v-model="progress" />
            </va-card-content>
          </va-card>
        </div>
        <div v-if="collection" class="collection-section">
          <h1>Collection</h1>
          <CollectionInfo @totalSupply="setTotalSupply" :collection="collection">
            <template v-slot:contractInfo>
              <ContractStats :contracts="nftContract"></ContractStats>
            </template>
          </CollectionInfo>
        </div>
        <div v-if="this.nft" class="comment-section">
          <CommentDisplay
          ref="comments"
          :nft_id="this.nft.id"
          :collection="this.nft.collection_slug"
          @ratingChange="getAverageRatings()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";
import {
  listCollections,
  listNftAssetContracts,
  getNft,
  //listNftEventCheckpoints,
  listUserFavoriteNfts,
  listUserWatchlistNfts,
  listNftTraits
} from "../graphql/queries";
import { fetchCollection, getNftEventsDirectly } from "../services/nftScraperService";
import {
  createUserFavoriteNft,
  deleteUserFavoriteNft,
  createUserWatchlistNft,
  deleteUserWatchlistNft,
} from "../graphql/mutations";
import ContractStats from "../components/ContractInfo";
import CollectionInfo from "../components/nft/CollectionInfo";
import TraitTable from "../components/nft/TraitTable";
import EntityCardList from "../components/nft/EntityCardList";
import TransactionTable from "../components/nft/TransactionTable.vue";
import TransactionChart from "../components/nft/TransactionChart.vue";
import CommentDisplay from "../components/comment/CommentDisplay.vue";
const Web3 = require('web3');

export default {
  name: "Nft",
  components: {
    ContractStats,
    CollectionInfo,
    TraitTable,
    EntityCardList,
    TransactionTable,
    TransactionChart,
    CommentDisplay
  },
  created() {
    this.nftData = this.$route.query;
  },
  async mounted() {
    await this.getUser();

    await this.getNFT();
    //if(this.nft === undefined) await this.getNFT();

    await this.getNFTs(this.nftData.address)

    await this.setFavoriteStatus(this.user, this.nftData.id);
    await this.setTotalFavorites(this.nftData.id);

    await this.setWatchStatus(this.user, this.nftData.id);

    if (this.collection === null || this.collection === undefined) {
      await this.collectionRequest(this.nft.collection_slug);
    }

    this.nftEvents = await getNftEventsDirectly(this.nftData.token_id, this.nftData.address);
    if(this.nftEvents.length > 0) {
      this.transactionStatus = "complete";
    } else {
      this.transactionStatus = "none";
    }

    this.getAverageRatings();
  },
  data() {
    return {
      totalSupply: null,
      nftData: null,
      nft: null,
      showContract: false,
      showCollection: false,
      showTransactions: [false],
      transactionStatus: "fetching",
      nftCollapses: [{ title: "Ownership" }, { title: "Traits" }],
      nftContract: [],
      currentContract: null,
      collection: null,
      nftEvents: [],
      showNftAccordion: [false, false],
      hasFavorited: false,
      isWatching: false,
      totalFavorites: null,
      user: "",
      lastCheckpoint: {},
      transactionDisplayState: 'chart',
      transactionDisplay: [
        {
          label: 'Table', value: 'table'
        },
        { 
          label: 'Chart', value: 'chart'
        }
      ],
      averageRating: 0,
    };
  },
  computed: {
    progress() {
      return (
        this.lastCheckpoint.total_events / this.lastCheckpoint.saved_events
      );
    },
    loadingStatus() {
      return this.transactionStatus;
    },
    traitColumnFields() {
      return ["type", "value", "count", "rarity"];
    },
    entityListData() {
      var entities = [];
      if (this.collection) {
        entities.push({
          type: "Collection",
          name: this.collection.name,
          image_url: this.collection.image_url,
        });
      }
      if (this.currentContract) {
        entities.push({
          type: "Contract",
          name: this.currentContract.name,
          image_url: this.currentContract.image_url,
        });
      }
      if (this.nft.owner && this.currentContract) {
        entities.push({
          type: "Owner",
          name: this.nft.owner,
          image_url: this.currentContract.image_url,
        });
      }
      return entities;
    },
    nftEventItems() {
      var events = this.nftEvents;
      if (events.length === 0) return [];
      var items = events.map((nftEvent) => {
        var eventType = "";
        if (nftEvent.event_type === "successful") {
          eventType = "Sale";
          nftEvent['from'] = nftEvent['transaction']['from_account']['address'];
        }
        else if (nftEvent.event_type === "transfer") eventType = "Transfer";
        else {
          eventType = "Bid";
          nftEvent['from'] = nftEvent.from_account['address'];
        }

        nftEvent['to'] = nftEvent['asset']['owner']['address'];
        var price = nftEvent.bid_amount;
        if(eventType === 'Sale') {
          price = nftEvent.total_price;
        }
        // Convert from wei to eth
        price = parseFloat(Web3.utils.fromWei(price.toString())).toFixed(3);
        
        // Round to two decimals
        return {
          event: eventType,
          price: price,
          from: nftEvent['from'] ? nftEvent['from'] : "-",
          to: nftEvent['to']? nftEvent['to'] : "-",
          created_date: nftEvent.created_date ? nftEvent.created_date : "-",
        };
      });
      return items;
    },
    transactionStats() {
      var last_bid = 0;
      var newestCreatedDate = null;
      var highest_bid = 0;
      var average_bid = 0;
      var total_bids = 0;
      var bid_volume = 0;
      var totalSales = 0;
      var newestSaleDate = null;
      var highest_sale = 0;
      var average_sale = 0;
      var last_sale = 0;
      var sales_volume = 0;

      if(this.nftEvents.length > 0) {
        this.nftEventItems.forEach((event) => {
          var currentTime = Date.parse(event.created_date);
          if (
            event["event"] === "Bid"
          ) {
            var bid_amount = event["price"];
            if (bid_amount) {
              bid_amount = parseFloat(bid_amount);
              total_bids += 1;
              average_bid += bid_amount;
              bid_volume += bid_amount;
            }
            if (currentTime > newestCreatedDate && bid_amount) {
              last_bid = bid_amount;
              newestCreatedDate = currentTime;
            }
            if (bid_amount > highest_bid) highest_bid = bid_amount;
          }
          if (event["event"] === "Sale") {
            var saleAmount = event["price"];
            if (saleAmount) {
              saleAmount = parseFloat(saleAmount);
              average_sale += saleAmount;
              totalSales += 1;
              sales_volume += saleAmount;
            }
            if (currentTime > newestSaleDate && saleAmount) {
              last_sale = saleAmount;
              newestSaleDate = currentTime;
            }
            if (saleAmount > highest_sale) highest_sale = saleAmount;
          }
        });
      }
      var avg_bid = 0;
      var avg_sale = 0;
      if (average_bid > 0) {
        avg_bid = (average_bid / total_bids).toFixed(3);
      }
      if (average_sale > 0) {
        avg_sale = (average_sale / totalSales).toFixed(3);
      }
      return {
        last_bid: last_bid.toFixed(3),
        highest_bid: highest_bid.toFixed(3),
        total_bids: total_bids,
        total_sales: totalSales,
        bid_volume: bid_volume.toFixed(3),
        average_bid: avg_bid,
        last_sale: last_sale.toFixed(3),
        highest_sale: highest_sale.toFixed(3),
        average_sale: avg_sale,
        sales_volume: sales_volume.toFixed(3),
      };
    },
  },
  // watch: {
  //   nftData() {
  //     if(this.nftData.id) {
  //       this.getNFT()
  //       .then(() => {
  //         console.log(this.nft);
  //       });
  //     }
  //   }
  // },
  methods: {
    async getUser() {
      try{
        const user = await Auth.currentAuthenticatedUser();
        this.user = user.username;
      } catch(e) { console.log(e); }
    },
    async setWatchStatus(userID, nftID) {
      try {
        const is_watching = await API.graphql({
          query: listUserWatchlistNfts,
          variables: {
            limit: 1000000,
            filter: { userID: { eq: userID }, nftID: { eq: nftID } },
          },
        });
        if (
          typeof is_watching.data.listUserWatchlistNfts.items[0] !== "undefined"
        ) {
          this.isWatching = true;
          console.log("is watching");
        } else {
          this.isWatching = false;
          console.log("not watching");
        }
      } catch (e) {
        console.error(e);
      }
    },
    // if user is watching, remove watch
    // else add watch
    async watch(userID, nftID) {
      if (!this.user) {
        this.$router.push("/user");
      }
      this.isWatching = !this.isWatching;
      try {
        const is_watching = await API.graphql({
          query: listUserWatchlistNfts,
          variables: {
            limit: 1000000,
            filter: { userID: { eq: userID }, nftID: { eq: nftID } },
          },
        });
        if (
          typeof is_watching.data.listUserWatchlistNfts.items[0] !== "undefined"
        ) {
          const userWatchlistNftId = {
            id: is_watching.data.listUserWatchlistNfts.items[0].id,
          };
          console.log("removing watch");
          await API.graphql({
            query: deleteUserWatchlistNft,
            variables: { input: userWatchlistNftId },
          });
        } else {
          console.log("adding watch");
          const userWatchlistNft = { userID, nftID };
          await API.graphql({
            query: createUserWatchlistNft,
            variables: { input: userWatchlistNft },
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    async setTotalFavorites(nftID) {
      console.log("nft id", nftID);
      try {
        const count = await API.graphql({
          query: listUserFavoriteNfts,
          
          variables: {
            filter: { nftID: { eq: nftID } },
          },
          
        });
        console.log("favorite count", count)
        this.totalFavorites = Object.keys(
          count.data.listUserFavoriteNfts.items
        ).length;
        console.log(this.totalFavorites, "total favorites");
      } catch (e) {
        console.error(e);
      }
    },
    async setFavoriteStatus(userID, nftID) {
      try {
        const has_favorited = await API.graphql({
          query: listUserFavoriteNfts,
          variables: {
            filter: { userID: { eq: userID }, nftID: { eq: nftID } },
          },
        });
        if (
          typeof has_favorited.data.listUserFavoriteNfts.items[0] !==
          "undefined"
        ) {
          this.hasFavorited = true;
          console.log("has favorited");
        } else {
          this.hasFavorited = false;
          console.log("not favorited");
        }
      } catch (e) {
        console.error(e);
      }
    },
    // if user has favorited, remove favorite
    // else add favorite
    async favorite(userID, nftID) {
      if (!this.user) {
        this.$router.push("/user");
      }
      this.hasFavorited = !this.hasFavorited;
      try {
        const has_favorited = await API.graphql({
          query: listUserFavoriteNfts,
          variables: {
            filter: { userID: { eq: userID }, nftID: { eq: nftID } },
          },
        });
        if (
          typeof has_favorited.data.listUserFavoriteNfts.items[0] !==
          "undefined"
        ) {
          const userFavoriteNftId = {
            id: has_favorited.data.listUserFavoriteNfts.items[0].id,
          };
          console.log("removing favorite");
          this.totalFavorites -= 1;
          await API.graphql({
            query: deleteUserFavoriteNft,
            variables: { input: userFavoriteNftId },
          });
        } else {
          console.log("adding favorite");
          this.totalFavorites += 1;
          const userFavoriteNft = { userID, nftID };
          await API.graphql({
            query: createUserFavoriteNft,
            variables: { input: userFavoriteNft },
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    async initSubscriptions() {},
    async getNFT() {
      try {
        var id = this.nftData.id;

        debugger;
        const nfts = await API.graphql({
          query: getNft,
          variables: {
            id
          },
        });
        debugger;
        var nft = nfts.data.getNft;
        console.log(nft);
        if(nft) {
          const nftTraits = await API.graphql({
            query: listNftTraits,
            variables: {
              filter: {
                id: { beginsWith: nft.id }
              }
            }
          });
          var traits = nftTraits.data.listNftTraits.items;
          nft['traits'] = traits;
          this.nft = nft;
          console.log(traits);
        }
        console.log(this.nft);
      } catch (error) {
        console.log(error);
      }
    },
    async getNFTs(address) {
      console.log("fetching");
      try {
        const contracts = await API.graphql({
          query: listNftAssetContracts,
          variables: {
            filter: { address: { eq: address } },
          },
        });
        this.nftContract = contracts.data.listNftAssetContracts.items;
        console.log(this.nftContract);

        // Convert Proxy object returned by query into JS object to access slug
        var currentContract = JSON.parse(JSON.stringify(this.nftContract)).at(
          0
        );
        this.currentContract = currentContract;
        console.log(currentContract);

        // Query collections for matching slug
        const collection = await API.graphql({
          query: listCollections,
          variables: {
            filter: { slug: { eq: currentContract.slug } },
          },
        });

        // There should only be one collection for each contract
        this.collection = JSON.parse(
          JSON.stringify(collection.data.listCollections.items)
        ).at(0);
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
            filter: { slug: { eq: collectionSlug } },
          },
        });

        // There should only be one collection for each contract
        this.collection = JSON.parse(
          JSON.stringify(collection.data.listCollections.items)
        ).at(0);
      } catch (error) {
        console.log(error);
      }
    },
    async collectionRequest(collectionSlug) {
      console.log("Fetching...");
      var response = await fetchCollection(collectionSlug);
      if (response.ok) {
        await this.getCollection();
      }
    },
    getAverageRatings() {
      console.log(this.$refs);
      try {
        var average = this.$refs['comments'].getAverageRating();
        this.averageRating = average;
      } catch(e) {
        this.averageRating = 0;
      }
    },
    setTotalSupply(event) {
      debugger;
      this.totalSupply = event.total_supply;
      console.log(this.total_supply);
    }
  },
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
  color: black;
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

.nft-content {
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
  padding-top: 9.5em;
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

.watchlist-icon {
  display: inline-block;
  margin-left: 1em;
}

.watchlist-icon:hover {
  cursor: pointer;
  color: red;
}

.nft-icon {
  display: inline-block;
  margin-left: 1em;
}

.nft-icon:hover {
  cursor: pointer;
  color: red;
}

.transaction-section {
  padding: 2em;
}

.background {
  background-color: #ffffff;
}

.right {
  right: 0;
}

.top {
  top: 0;
}

#container {
  position: relative;
}

#container > * {
  position: absolute;
}

.sale-info {
  width: 100%;
}

.sales-table {
  width: 100%;
}

.comment-section {
  width: 100%;
}

.rating {
  justify-content: center;
  align-items: center;
}
</style>
