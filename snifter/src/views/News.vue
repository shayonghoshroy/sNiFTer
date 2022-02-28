<template>
  <div class="search">
    <article>
      <h2 class="is-white">News</h2>
      <p class="is-white">See what's hot in the world of NFT's</p>
    </article>
    <TweetSearchComponent
      ref="tweetSearchComponent"
      @twitterSearch="searchResults($event)"
    />
    <div v-if="searched">
      <div v-if="searchStatus === 'Fetching'" class="pending-search-result">
        <va-inner-loading :loading="true" color="primary">
          <va-card>
            <va-card-content> Fetching Tweets... </va-card-content>
          </va-card>
        </va-inner-loading>
      </div>
      <div class="empty-search-results" v-else-if="searchStatus === 'Failure'">
        <va-alert class="search-alert mb-4" color="danger" icon="info">
          No search results...
        </va-alert>
      </div>
      <div v-else>
        <TweetComponent :tweets="data" />
      </div>
    </div>
    <div v-else>
      <TweetComponent />
    </div>
  </div>
</template>

<script>
import TweetComponent from "../components/TweetComponent";
import TweetSearchComponent from "../components/TweetSearchComponent";
export default {
  name: "News",
  components: { TweetComponent, TweetSearchComponent },
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
    searchResults(event) {
      this.searchStatus = event.searchStatus;
      this.searchType = event.searchType;
      this.data = event.data;
      this.searched = true;
    },
  },
};
</script>
<style scoped>
div {
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
@media (max-width: 700px) {
  div {
    padding: 4em 0em;
  }
  .description {
    text-align: justify;
    width: 90vw;
  }
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
blockquote.twitter-tweet {
  display: inline-block;
  font-family: "Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  border-color: #eee #ddd #bbb;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  margin: 10px 5px;
  padding: 0 16px 16px 16px;
  max-width: 468px;
}
blockquote.twitter-tweet p {
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
}
blockquote.twitter-tweet a {
  color: inherit;
  font-weight: normal;
  text-decoration: none;
  outline: 0 none;
}
blockquote.twitter-tweet a:hover,
blockquote.twitter-tweet a:focus {
  text-decoration: underline;
}
.is-white {
  color: #ffffff;
}
</style>
