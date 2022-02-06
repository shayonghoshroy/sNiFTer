<template>
  <div id="nftcomponent">
    <simple-grid-container class="container" columnWidth="300px">
      <div class="post" v-for="nft in nfts" :key="nft.id">
        <div class="row div">
          <div class="flex md6 lg4">
            <router-link
            :to="{ name: 'Nft', 
            query: nft
            }">
              <va-card class="nft-card" style="height: 300px; width: 250px">
                <div v-if="nft.image_url !== undefined && nft.image_url !== ''">
                  <va-image
                    class="rounded-card"
                    :src="nft.image_url"
                    style="height: 200px"
                  />
                </div>
                <div v-else>
                  <va-image
                    class="rounded-card"
                    src="../assets/logo3.png"
                    style="height: 200px;"
                  />
                </div>
                <va-card-title>{{ nft.name }}</va-card-title>
                <va-card-content
                  >
                  <div class="nft-stub">
                    <div class="nft-icon">
                      <va-icon
                      v-if="hasFavorited"
                      name="favorite"
                      size="medium"
                      color="red"
                      @click="hasFavorited = false"></va-icon>
                      <va-icon
                      v-else
                      name="favorite_border"
                      size="medium"
                      @click="hasFavorited = true"></va-icon>
                    </div>
                  </div>
                </va-card-content>
              </va-card>
            </router-link>
          </div>
        </div>
      </div>
    </simple-grid-container>
  </div>
</template>

<script>
require("@/assets/logo3.png");

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
      hasFavorited: false
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
    truncateName(nftName) {
      if(nftName === null || nftName.length < 14)
        return nftName;
      return nftName.substring(0, 14) + '...';
    }
  },
};
</script>
<style scoped>
.post {
  background: #fff;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.nft-card:hover {
  cursor: pointer;
  box-shadow: 15px 5px 15px 5px grey;
}

.nft-name {
  text-align: center;
  display: inline-block;
}

.nft-icon {
  position: absolute;
  right: 1em;
  display: inline-block;
  z-index: 2;
}

.nft-icon:hover {
  cursor: pointer;
  border: solid black 1px;
  border-radius: 50%;
  padding: 2px;
}

</style>
