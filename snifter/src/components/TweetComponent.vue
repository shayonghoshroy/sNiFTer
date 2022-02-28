<template>
  <div id="tweetcomponent" v-if="tweets.length > 0">
    <div>
      <div class="post" v-for="tweet in tweets" :key="tweet.id">
        <blockquote class="twitter-tweet">
          <p lang="en" dir="ltr">{{ tweet.text }}</p>
          &mdash; {{ tweet.username }} (@{{ tweet.username }})
          <a :href="tweet.URL">{{ tweet.date }}</a>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
var TwitterWidgetsLoader = require("twitter-widgets");
import { API } from "aws-amplify";
import { listTweets } from "../graphql/queries";
export default {
  name: "TweetComponent",
  async created() {
    if (this.tweets.length === 0) this.getTweets();
  },
  mounted() {
    TwitterWidgetsLoader.load();
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
            limit: 100,
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
.post {
  background: #fff;
  padding: 1.5em;
  background-color: transparent;
}
.post h2 {
  font-size: 1.3em;
  padding-bottom: 0.25rem;
}
.post p {
  color: #888;
}
.center {
  margin-left: auto;
  width: 61%;
  padding: 10px;
}
</style>
