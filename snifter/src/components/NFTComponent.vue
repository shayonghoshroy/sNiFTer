<template>
  <div id="nftcomponent" ref="scrollComponent">
    <div class="container">
      <div class="post" v-for="nft in nfts" :key="nft.id">
        <div class="row div">
          <div class="flex md6 lg4">
            <va-card class="nft-card" style="height: 300px; width: 250px">
              <router-link :to="{ name: 'Nft', query: nft }">
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
                    style="height: 200px"
                  />
                </div>
                <va-card-title v-if="nft.name">{{ nft.name }}</va-card-title>
                <va-card-title v-else>{{ nft.token_id }}</va-card-title>
              </router-link>
              <va-card-content>
                <div class="nft-stub">
                  <div class="nft-icon">
                    <va-icon
                      v-if="nft.hasFavorited"
                      name="favorite"
                      size="medium"
                      color="red"
                      @click="favorite(this.user, nft.id)"
                    ></va-icon>
                    <va-icon
                      v-else
                      name="favorite_border"
                      size="medium"
                      @click="favorite(this.user, nft.id)"
                    ></va-icon>
                  </div>
                  <div class="total-favorites">
                    <p>{{ nft.totalFavorites }}</p>
                  </div>
                </div>
              </va-card-content>
            </va-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("@/assets/logo3.png");
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";
import { listNfts, listUserFavoriteNfts } from "../graphql/queries";
import {
  createUserFavoriteNft,
  deleteUserFavoriteNft,
} from "../graphql/mutations";

export default {
  name: "NFTComponent",
  async created() {
    await this.getUser();
    await this.getNFTs();
  },
  props: {
    insertNfts: {
      type: Boolean,
      default: false,
    },
    insertedNfts: {
      type: Array,
      default: () => [],
    },
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
      user: "",
      value: 1,
      nftsTemp: [],
    };
  },
  methods: {
    async getUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.user = user.username;
      } catch(e) {
        console.error(e);
      }
    },
    async getNFTs() {
      if (!this.insertNfts) {
        try {
          const nfts = await API.graphql({
            query: listNfts,
            variables: {
              limit: 100,
            },
          });
          this.nfts = nfts.data.listNfts.items;
          console.log(this.nfts);
        } catch (e) {
          console.error(e);
        }
      } else this.nfts = this.insertedNfts;
      // add fields to nfts
      for (let i = 0; i < this.nfts.length; i++) {
        // add field to store if the user has favorited it
        try {
          const has_favorited = await API.graphql({
            query: listUserFavoriteNfts,
            variables: {
              filter: {
                userID: { eq: this.user },
                nftID: { eq: this.nfts[i].id },
              },
            },
          });
          if (
            typeof has_favorited.data.listUserFavoriteNfts.items[0] !==
            "undefined"
          ) {
            this.nfts[i].hasFavorited = true;
          } else {
            this.nfts[i].hasFavorited = false;
          }
        } catch (e) {
          //console.error(e);
        }
        // add total number of favorites
        try {
          const count = await API.graphql({
            query: listUserFavoriteNfts,
            variables: {
              filter: { nftID: { eq: this.nfts[i].id } },
            },
          });
          this.nfts[i].totalFavorites = Object.keys(
            count.data.listUserFavoriteNfts.items
          ).length;
        } catch (e) {
          console.error(e);
        }
      }
    },
    truncateName(nftName) {
      if (nftName === null || nftName.length < 14) return nftName;
      return nftName.substring(0, 14) + "...";
    },
    // if user has favorited, remove favorite
    // else add favorite
    async favorite(userID, nftID) {
      if (!this.user) {
        this.$router.push("/user");
      }
      const index = this.nfts.findIndex((x) => x.id === nftID);
      this.nfts[index].hasFavorited = !this.nfts[index].hasFavorited;
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
          this.nfts[index].totalFavorites -= 1;
          await API.graphql({
            query: deleteUserFavoriteNft,
            variables: { input: userFavoriteNftId },
          });
        } else {
          this.nfts[index].totalFavorites += 1;
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
  },
};
</script>
<style scoped>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
.nft-icon:hover {
  cursor: pointer;
  color: red;
}
</style>
