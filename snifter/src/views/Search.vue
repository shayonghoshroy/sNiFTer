<template>
  <div class="search description">
    <article>
      <h2>Feeling nosey?</h2>
      <p>Take your pick!</p>
    </article>
    <SearchComponent ref="searchComponent" @getNFTs="searchResult($event)" />
    <div v-if="searched">
      <div class="empty-search-wrapper" v-if="searchStatus === 'Failure'">
        <div class="empty-search-results">
          <va-alert class="search-alert mb-4" color="danger" icon="info">
            No search results...
          </va-alert>
        </div>
      </div>
      <div v-else>
        <NFTComponent v-if="searchType === 'nft'" :insertNfts="true" :insertedNfts="data" />
      </div>
    </div>
    <div class="search-description" v-else-if="!searched">
      <article>
        <p>Search for Collections, and NFTs!</p>
      </article>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import SearchComponent from "../components/SearchComponent";
import NFTComponent from "../components/NFTComponent.vue";
export default {
  name: "Search",
  components: {
    SearchComponent,
    NFTComponent,
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

.empty-search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-search-results {
  width: 80%;
}
</style>
