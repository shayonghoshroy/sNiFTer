<template>
  <div class="search">
    <article>
      <h2>Take your pick</h2>
      <p>You've already got your eye on these</p>
    </article>
    <SearchComponent ref="searchComponent" @getNFTs="searchResult($event)"/>
    <div v-if="nfts.length > 0">
      <NFTDisplay :nfts="nfts"/>
    </div>
    <div class="search-description" v-else-if="!searched">
      <article>
        <p>Search for Collections, Tokens, Owners, and Creators!</p>
      </article>
    </div>
    <div class="empty-search-results" v-else>
      <va-alert class="search-alert mb-4" color="danger" icon="info">
          No search results...
      </va-alert>
    </div>
  </div>
</template>

<script>
  import SearchComponent from "../components/SearchComponent";
  import NFTDisplay from "../components/nft/NFTDisplay.vue";

  export default {
    name: "Search",
    components: { 
      SearchComponent,
      NFTDisplay
    },
    setup() {
      return {};
    },
    data() {
      return {
        nfts: [],
        searched: false,
      }
    },
    methods: {
      searchResult(nfts) {
        console.log(nfts);
        this.nfts = nfts;
        this.searched = true;
      }
    },
  };
</script>

<style scoped>
h1 {
  margin-top: 1em;
  text-align: center;
}

.search {
  padding-right: 10em;
  padding-left: 10em;
}

.description {
  width: 60vw;
}
p {
  font-size: clamp(16px, 1.2vw, 1.2vw);
  line-height: 2;
  color: #9d9d9d;
}
h2 {
  font-size: clamp(24px, 3vw, 3vw);
  font-weight: 300;
  margin: 0;
}
</style>