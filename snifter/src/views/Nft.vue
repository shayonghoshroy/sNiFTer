<template>
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
            {{ nft.name }} {{ nft.token_id }}
        </va-card-content>

        <va-collapse
        v-model="showContract"
        header="Contract Information">
          <contract-stats
          :contracts="nftContract">
          </contract-stats>
        </va-collapse>
    </va-card>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listNftAssetContracts } from "../graphql/queries";
import ContractStats from "../components/ContractInfo";

export default {    
  name: "Nft",
  components: {
    ContractStats,
  },
  async created(){
    console.log(this.$route.query);
    this.nftData = this.$route.query;

    await this.getNFTs(this.nftData.address);
    console.log(this.nftContract);
  },
  data() {
    return {
        nftData: null,
        showContract: false,
        collapses: [
        { title: 'Contract', content: 'first collapse content' },
        ],
        nftContract: []
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
            const nfts = await API.graphql({
                query: listNftAssetContracts,
                variables: {
                filter: {address: {eq: address}}
                },
            });
            this.nftContract = nfts.data.listNftAssetContracts.items;
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
</style>