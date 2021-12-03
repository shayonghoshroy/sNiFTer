<template>
  <div id="tweetcomponent">
    <div>
      <div class="post" v-for="tweet in tweets" :key="tweet.id">
        <h3>{{ tweet.username }}</h3>
        <p>{{ tweet.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listTweets } from "../graphql/queries";
export default {
  name: "TweetComponent",
  async created() {
    this.getTweets();
  },
  data() {
    return {
      username: "",
      text: "",
      tweets: [],
    };
  },
  methods: {
    async getTweets() {
      try {
        const tweets = await API.graphql({
          query: listTweets,
          variables: {
            limit: 10,
          },
        });
        this.tweets = tweets.data.listTweets.items;
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

.post:not(:last-child) {
  border-bottom: 1px solid #ddd;
}

.post h2 {
  font-size: 1.3em;
  padding-bottom: 0.25rem;
}

.post p {
  color: #888;
}
</style>
