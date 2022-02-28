<template>
  <div class="search description">
    <article>
      <h2>Take your pick</h2>
      <p>You've already got your eye on these</p>
    </article>
    <SearchComponent ref="searchComponent" @getNFTs="searchResult($event)" />
    <div v-if="searched">
      <div v-if="searchStatus === 'Fetching'" class="pending-search-result">
        <va-inner-loading :loading="true" color="primary">
          <va-card>
            <va-card-content> Fetching NFT... </va-card-content>
          </va-card>
        </va-inner-loading>
      </div>
      <div class="empty-search-results" v-else-if="searchStatus === 'Failure'">
        <va-alert class="search-alert mb-4" color="danger" icon="info">
          No search results...
        </va-alert>
      </div>
      <div v-else>
        <NFTDisplay v-if="searchType === 'nft'" :nfts="data" />
        <CollectionDisplay
          class="background"
          v-else-if="searchType === 'collection'"
          :collections="data"
        />
      </div>
    </div>
    <div class="search-description" v-else-if="!searched">
      <article>
        <p>Search for Collections, Tokens, Owners, and Creators!</p>
      </article>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import SearchComponent from "../components/SearchComponent";
import NFTDisplay from "../components/nft/NFTDisplay.vue";
import CollectionDisplay from "../components/nft/CollectionDisplay.vue";

export default {
  name: "Search",
  components: {
    SearchComponent,
    NFTDisplay,
    CollectionDisplay,
  },
  setup() {
    return {};
  },
  data() {
    return {
      data: [],
      searched: false,
      searchType: "",
      searchStatus: "None",
    };
  },
  methods: {
    searchResult(event) {
      this.searchStatus = event.searchStatus;
      this.searchType = event.searchType;
      this.data = event.data;
      this.searched = true;
    },
  },
};
</script>

<style scoped>
.description {
  width: 100vw;
  height: 90vh;
}
p {
  font-size: clamp(16px, 1.2vw, 1.2vw);
  line-height: 2;
  color: #ffffff;
}
h2 {
  font-size: clamp(24px, 3vw, 3vw);
  font-weight: 300;
  margin: 0;
  color: white;
}
.background {
  background-color: transparent;
}
</style>
