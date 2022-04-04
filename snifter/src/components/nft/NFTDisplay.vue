<template>
  <div id="nftcomponent">
    <simple-grid-container class="container" columnWidth="300px">
      <div class="post" v-for="nft in nfts" :key="nft.id">
        <div class="row div">
          <div class="flex md6 lg4">
            <router-link :to="{ name: 'Nft', query: nft }">
              <va-card class="nft-card" style="height: 300px; width: 250px">
                <va-image
                  v-if="nft.image_url"
                  class="rounded-card"
                  :src="nft.image_url"
                  style="height: 200px"
                />
                <va-card-title>{{ nft.name }}</va-card-title>
                <va-card-content class="card-content">
                  <div>
                    <div>{{ nft.name }} {{ nft.token_id }}</div>
                    <div>
                      <va-icon name="favorite_border" color="primary"></va-icon>
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
export default {
  name: "NFTComponent",
  data() {
    return {
      name: "",
      description: "",
      image_url: "",
      image_thumbnail_url: "",
      image_preview_url: "",
      token_id: "",
    };
  },
  props: {
    nfts: {
      type: Array,
      default: null,
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
.nft-card:hover {
  cursor: pointer;
  box-shadow: 15px 5px 15px 5px grey;
}
</style>
