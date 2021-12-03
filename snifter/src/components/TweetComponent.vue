<template>
  <div id="tweetcomponent">
    <div>
      <div class="post" v-for="tweet in tweets" :key="tweet.id">
        <div class="row center">
          <div class="flex md6 lg4">
            <va-card tag="b">
              <va-card-title>{{ tweet.username }}</va-card-title>
              <va-card-content>{{ tweet.text }}</va-card-content>
            </va-card>
          </div>
        </div>
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
            limit: 50,
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

.post h2 {
  font-size: 1.3em;
  padding-bottom: 0.25rem;
}

.post p {
  color: #888;
}
.center {
  margin-left: auto;
  width: 60%;
  padding: 10px;
}
</style>
