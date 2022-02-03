<template>
  <div class="flex-container">
    <div class="nft-container">
      <va-card :src="nft" class="nft-card" style="height: 500px; width: 500px">
          <va-image
              class="rounded-card"
              :src="nft.image_url"
              style="height: 400px"
          />
          <va-card-title v-if="nft.name">{{ nft.name }}</va-card-title>
          <va-card-title v-else></va-card-title>

          <va-card-content>
              {{ nft.token_id }}
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
    
    <div class="nft-stub">
      <div class="nft-icon">
        <va-icon
        v-if="hasFavorited"
        name="favorite"
        size="large"
        color="red"
        
        @click="hasFavorited = false"></va-icon>
        <va-icon
        v-else
        name="favorite_border"
        size="large"
        @click="favorite('shayon', nft.id)"></va-icon>
      </div>
    </div>
  </div>
  
</template>

<script>
import { API } from "aws-amplify";
import { listCollections, listNftAssetContracts, listUserFavoriteNfts } from "../graphql/queries";
import { createUserFavoriteNft, deleteUserFavoriteNft } from '../graphql/mutations';
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
        collection: null,
    }
  },
  computed: {
      nft() {
        return this.nftData;
      },
  },
  methods: {
    async favorite(userID, nftID) {
      try {
        // if the user has favorited this nft, remove the relationship
        // else create the relationship
        const hasFavorited = await API.graphql({
          query: listUserFavoriteNfts,
          variables: {
            filter: {userID: {eq: userID}, nftID: {eq: nftID}}
          }
        });

        if (typeof hasFavorited.data.listUserFavoriteNfts.items[0] !== "undefined") {
          const userFavoriteNftId = {id: hasFavorited.data.listUserFavoriteNfts.items[0].id};

          console.log('favorite relationship between username:' + userID + ' and nft ID:' + nftID + ' exists');
          console.log('removing favorite');
          
          await API.graphql({
            query: deleteUserFavoriteNft,
            variables: {input: userFavoriteNftId},
          });
        } else {
          console.log('favorite relationship between username:' + userID + ' and nft ID:' + nftID + ' does not exist');
          console.log('adding favorite');

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

.flex-container {
  display: flex;
  /*align-items: center;*/
  justify-content: center;
}

.nft-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
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

.nft-icon {
  display: inline-block;
  margin-left: 1em;
}

.nft-icon:hover {
  cursor: pointer;
  color: red;
}

</style>