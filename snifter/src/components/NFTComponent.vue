<template>
  <div id="nftcomponent">
    <simple-grid-container class="container" columnWidth="300px">
      <div class="post" v-for="nft in nfts" :key="nft.id">
        <div class="row div">
          <div class="flex md6 lg4">
            <va-card style="height: 300px; width: 250px">
              <va-image
                class="rounded-card"
                :src="nft.image_url"
                style="height: 200px"
              />
              <va-card-title>{{ nft.name }}</va-card-title>
              <va-card-content
                >{{ nft.name }} {{ nft.token_id }}
              </va-card-content>
            </va-card>
          </div>
        </div>
      </div>
    </simple-grid-container>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listNfts } from "../graphql/queries";
export default {
  name: "NFTComponent",
  async created() {
    this.getNFTs();
  },
  data() {
    return {
      name: "",
      description: "",
      image_url: "",
      image_thumbnail_url: "",
      image_preview_url: "",
      token_id: "",
      nfts: [],
    };
  },
  methods: {
    async getNFTs() {
      try {
        const nfts = await API.graphql({
          query: listNfts,
          variables: {
            limit: 300,
          },
        });
        this.nfts = nfts.data.listNfts.items;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style scoped>
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
</style>