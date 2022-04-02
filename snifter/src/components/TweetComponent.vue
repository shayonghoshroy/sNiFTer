<template>
  <div>
    <div v-if="!defaultSearch">
      <div v-for= 'tweet in tweets' :key="tweet.id">
        <Tweet
          :tweet-id= "tweet.id"
          cards="visible"
          conversation="all"
          lang="en"
          theme="light"
          align="center"
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
      </div>
    </div>
    <div v-else>
      <div v-for= 'tweet in defaultTweets' :key="tweet.id">
        <Tweet
          :tweet-id= "tweet.id"
          cards="visible"
          conversation="all"
          lang="en"
          theme="light"
          align="center"
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
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Tweet from "vue-tweet";
import { API } from "aws-amplify";
import { tweetsByMostRecent } from "../graphql/queries";
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
  async created() {
    console.log(this.defaultSearch);
    if(this.defaultSearch) {
      await this.getTweets();
    }

    console.log(this.tweets);
    //console.log(this.tweets)
    //console.log(this.tweets)this.tweets.length === 0
  },
  props: {
    defaultSearch: {
      type: Boolean,
      default: false
    },
    tweets: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      defaultTweets: []
    };
  },
  methods: {
    async getTweets() {
      var timestamp = (+new Date/1000) - 86400;
      try {
        const tweets = await API.graphql({
          query: tweetsByMostRecent,
            variables: ({
              source: "nft",
              date: {ge: timestamp},
              limit: 10,
            }),
        });
        this.defaultTweets = tweets.data.tweetsByMostRecent.items;
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>