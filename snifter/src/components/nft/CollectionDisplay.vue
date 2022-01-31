<template>
  <div id="nftcomponent">
    <simple-grid-container class="container" columnWidth="300px">
      <div class="post" v-for="collection in collections" :key="collection.id">
        <div class="row div">
          <div class="flex md6 lg4">
            <va-card class="collection-card" style="height: 300px; width: 250px">
              <va-image v-if="collection.image_url"
                class="rounded-card"
                :src="collection.image_url"
                style="height: 200px"
              />
              <va-card-title>{{ collection.name }}</va-card-title>
            </va-card>
          </div>
        </div>
      </div>
    </simple-grid-container>
  </div>
</template>

<script>
export default {
  name: "CollectionDisplay",
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
      collections: {
          type: Array,
          default: null
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

.collection-card:hover {
  cursor: pointer;
  box-shadow: 15px 5px 15px 5px grey;
}

</style>