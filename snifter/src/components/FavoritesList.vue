<template>
  <div>
    <h2 class="mt-3">Favorites</h2>
    <div v-if="Favorites.length != 0">
      <div class="mt-1" style="color: #d3d3d3">They love you too</div>
      <div id="nftcomponent">
        <simple-grid-container class="container" columnWidth="50px">
          <div class="post" v-for="nft in nfts" :key="nft.id">
            <div class="row div">
              <div class="flex md6 lg4">
                <va-card class="nft-card" style="height: 150px; width: 125px">
                  <router-link :to="{ name: 'Nft', query: nft }">
                    <va-image
                      v-if="nft.image_url"
                      class="rounded-card"
                      :src="nft.image_url"
                      style="height: 100px"
                    />
                    <va-card-title v-if="nft.name">{{
                      nft.name
                    }}</va-card-title>
                    <va-card-title v-else>{{ nft.token_id }}</va-card-title>
                  </router-link>
                </va-card>
              </div>
            </div>
          </div>
        </simple-grid-container>
      </div>
    </div>
    <div v-else>
      <div class="mt-1">Go add some NFTs to your Favorites</div>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listUserFavoriteNfts, listNfts } from "../graphql/queries";
import Auth from "@aws-amplify/auth";

export default {
  name: "Favorites",
  data() {
    return {
      Favorites: [],
      nfts: [],
    };
  },
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.user = user;
      this.username = user.username;
      await this.getFavorites();
      await this.getNFTs();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async getFavorites() {
      try {
        const Favorites = await API.graphql({
          query: listUserFavoriteNfts,
          variables: {
            filter: {
              userID: { eq: this.username },
            },
          },
        });
        this.Favorites = Favorites.data.listUserFavoriteNfts.items;
      } catch (e) {
        console.error(e);
      }
    },
    async getNFTs() {
      try {
        for (let i = 0; i < this.Favorites.length; i++) {
          const nft = await API.graphql({
            query: listNfts,
            variables: {
              filter: {
                id: { eq: this.Favorites[i].nftID },
              },
            },
          });
          this.nfts.push(nft.data.listNfts.items[0]);
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="css">
h2 {
  font-size: clamp(14px, 2vw, 2vw);
  font-weight: 300;
  margin: 0;
}
.post {
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
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
}

.nft-name {
  text-align: center;
  display: inline-block;
}

.nft-stub {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
}
</style>
