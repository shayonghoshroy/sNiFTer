<template>
  <div id="tweetcomponent">
    <div>
      <div class="post" v-for="tweet in tweets" :key="tweet.id">
        <div class="row center">
          <div class="flex md6 lg4">
            <Tweet
              tweet-id="tweet.id"
              cards="visible"
              conversation="all"
              lang="en"
              theme="light"
              align="left"
              :width="400"
              :dnt="false"
              @tweet-load-error="onTweetLoadError"
              @tweet-load-success="onTweetLoadSuccess"
            >
              <template v-slot:loading>
                <span>Loading...</span>
              </template>
              <template v-slot:error>
                <span>Sorry, that tweet doesn’t exist!</span>
              </template>
            </Tweet>
            <va-card tag="b">
              <va-card-title>{{ tweet.id }}</va-card-title>
              <va-card-content>{{ tweet.text }}</va-card-content>
            </va-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Tweet from "vue-tweet";
import { API } from "aws-amplify";
import { listTweets } from "../graphql/queries";
export default defineComponent({
  components: {
    Tweet,
  },
  setup() {
    function onTweetLoadSuccess(embedNode) {
      console.log(embedNode);
    }

    function onTweetLoadError() {
      console.log("Ops... an error has occurred");
    }

    return { onTweetLoadSuccess, onTweetLoadError };
  },
  name: "TweetComponent",
  async created() {
    this.getTweets();
  },
  data() {
    return {
      username: "",
      text: "",
      tweets: [].toString(),
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
        console.log(this.tweets);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
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
  width: 61%;
  padding: 10px;
}
</style>
