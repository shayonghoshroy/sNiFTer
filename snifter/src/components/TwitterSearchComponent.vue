<template>
  <div class="tweetSearchComponent">
    <div class="search-wrapper">
      <va-button-dropdown 
        :label="searchTypes.at(searchIndex)[0]"
        split
      >
        
        <va-list class="search-item-list">
          <va-list-item
            class="search-item"
            v-for="(type, index) in searchTypes"
            :key="index"
            @click="searchIndex = index"
          >
            <va-list-item-section avatar>
              <va-icon :name="type[1]"></va-icon>
            </va-list-item-section>
            <va-list-item-section>
              <va-list-item-label>{{ type[0] }}</va-list-item-label>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </va-button-dropdown>
      <va-button :disabled="disableSearch" @click="tweetFilters(this.searchIndex)">
        Search
      </va-button>
    </div>
    <div class="tweetcontainer">
        <div v-for= 'tweet in tweets' :key="tweet.id" style="min-width: 500px">
            <Tweet
            :tweet-id= "tweet.id"
            width=500
            cards="visible"
            conversation="all"
            lang="en"
            theme="light"
            align="center"
            :dnt="false"
            @tweet-load-error="onTweetLoadError"
            @tweet-load-success="onTweetLoadSuccess"
            >
            <template v-slot:loading>
                <span><va-progress-circle color="#ffffff" indeterminate /></span>
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
import { API } from "aws-amplify";
import { userTweetsByMostRecent, tweetsByMostRecent, listTweets } from "../graphql/queries";
import Tweet  from "vue-tweet";
import { fetchTweets, fetchTwitterUser } from "../services/tweetScraperService";
export default {
  name: "tweetSearchComponent",
  components: { Tweet },
  async created() { 
    //await this.listAllTweets();
    this.tweetFilters(0);
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
  data() {
    return {
      keywordTweets: "",
      keywordUser: "",
      tweets: [],
      twitterUsers: [],
      searchTypes: [
        ["NFTs", "palette"],
        ["Creators", "person"],
        ["Currency", "attach_money"],
        ["Network", "rss_feed"]
      ],
      searchIndex: 0,
      requestCount: 0,
      disableSearch: false,
    };
  },
  computed: {
    searchType() {
      return this.searchTypes[this.searchIndex];
    },
  },
  methods: {
    async tweetFilters(searchIndex) {
      if(searchIndex === 0) {
        await this.getNFTTweets();
      }
      else if(searchIndex === 1) {
        await this.getCreatorTweets();
      }
      else if(searchIndex === 2) {
        await this.getCurrencyTweets();
      }
      else if(searchIndex === 3) {
        await this.getNetworkTweets();
      }
      else {
        console.log("error");
      }
    },
    listAllTweets: async function () {
      try {
        const tweet = await API.graphql({
          query: listTweets,
          variables: {
            filters: {},
            limit: 1000,
          },
        });
        console.log(tweet);
      } catch(e) {
        console.log(e);
      }
      
    },
    getNetworkTweets: async function () {
            try {
                console.log("Starting Query");
                //["DAI", "USDC", "ETH", "BTC"],
                const tweets = await API.graphql({
                  query: listTweets,
                  variables: {
                    filter: { 
                      or: [
                        {text: {contains: "Ethereum"}},
                        {text: {contains: "Bitcoin"}},
                        {text: {contains: "Polygon"}},
                        {text: {contains: "Web3"}},
                        {text: {contains: "Proof-of-Stake"}},
                        {text: {contains: "Proof of Stake"}},
                        {text: {contains: "Proof-of-Work"}},
                        {text: {contains: "Proof of Work"}}
                      ]
                    },
                  },
                });
                this.tweets = tweets.data.listTweets.items;
                console.log(this.tweets);
            } catch (e) {
                console.error(e);
            }
        },
        getCurrencyTweets: async function () {
            try {
                console.log("Starting Query");
                //["DAI", "USDC", "ETH", "BTC"],
                const tweets = await API.graphql({
                  query: listTweets,
                  variables: {
                    filter: { 
                      or: [
                        {text: {contains: "DAI"}},
                        {text: {contains: "USDC"}},
                        {text: {contains: "ETH"}},
                        {text: {contains: "BTC"}},
                      ]
                    },
                  },
                });
                this.tweets = tweets.data.listTweets.items;
                console.log(this.tweets);
            } catch (e) {
                console.error(e);
            }
        },
        getNFTTweets: async function () {
            try {
                console.log("Starting Query");
                //["DAI", "USDC", "ETH", "BTC"],
                const tweets = await API.graphql({
                  query: listTweets,
                  variables: {
                    filter: { 
                      or: [
                        {text: {contains: "Bored Ape Yacht Club"}},
                        {text: {contains: "CryptoPunks"}},
                        {text: {contains: "Sandbox"}},
                        {text: {contains: "VeeFriends"}},
                        {text: {contains: "Ape"}},
                        {text: {contains: "BAYC"}},
                        {text: {contains: "Doodles"}},
                        {text: {contains: "Cool Cats"}},
                        {text: {contains: "Decentraland"}},
                        {text: {contains: "Art Blocks"}},
                        {text: {contains: "CyberKongz"}},
                        {text: {contains: "SuperRare"}},
                        {text: {contains: "Beeple"}}
                      ]
                    },
                  },
                });
                console.log(tweets);
                this.tweets = tweets.data.listTweets.items;
                console.log(this.tweets);
            } catch (e) {
                console.error(e);
            }
        },
        getCreatorTweets: async function () {
            try {
                console.log("Starting Query");
                //["DAI", "USDC", "ETH", "BTC"],
                const tweets = await API.graphql({
                  query: listTweets,
                  variables: {
                    filter: { 
                      or: [
                        {username: {eq: "Zeneca_33"}},
                        {username: {eq: "SpottieWiFi"}},
                        {username: {eq: "andy8052"}},
                        {username: {eq: "garyvee"}}
                      ]
                    },
                  },
                });
                console.log(tweets);
                this.tweets = tweets.data.listTweets.items;
                console.log(this.tweets);
            } catch (e) {
                console.error(e);
            }
        },
    startSearch: async function () {
      this.disableSearch = false;
      var response = null;
      var event = {
        searchStatus: "Faliure",
        data: [],
        searchType: "",
      };
      //tweet search
      try {
        if (this.searchIndex === 0) {
          event["searchType"] = "Tweets";
          if (this.tweets.length === 0) {
            event["searchStatus"] = "Fetching";
            this.$emit("twitterSearch", event);
            response = await fetchTweets(this.keywordTweets);
            //successful search
            if (response.ok) {
              await this.getTweets();
              event["data"] = this.tweets;
              if (this.tweets.length > 0) {
                event["searchStatus"] = "Success";
              }
            } else {
              event["searchStatus"] = "Failure";
            }
            this.$emit("twitterSearch", event);
          } else {
            event["searchStatus"] = "Success";
            event["data"] = this.tweets;
            this.$emit("twitterSearch", event);
          }
        } else if (this.searchIndex === 1) {
          event["searchType"] = "TwitterUser";
          if (this.twitterUsers.length === 0) {
            event["searchStatus"] = "Fetching";
            this.$emit("twitterSearch", event);
            response = await fetchTwitterUser(this.keywordUsers);
            if (response.ok) {
              await this.getTwitterUsers();
              event["data"] = this.twitterUsers;
              if (this.twitterUsers.length > 0) {
                event["searchStatus"] = "Success";
              }
            } else {
              event["searchStatus"] = "Failure";
            }
            this.$emit("twitterSearch", event);
          } else {
            event["searchStatus"] = "Success";
            event["data"] = this.twitterUsers;
            this.$emit("twitterSearch", event);
          }
        }
      } catch (e) {
        event["searchStatus"] = "Failure";
        console.error(e);
        this.$emit("twitterSearch", event);
      }
      this.disableSearch = false;
      this.tweets = [];
    },
    getTweets: async function () {
      // getting the current unix epoch of exactly 1 days ago
      var timestamp = (+new Date/1000) - 86400;
      try {
        this.keywordTweets = this.keywordTweets.toLowerCase();
        const tweet = await API.graphql({
          query: tweetsByMostRecent,
          variables: {
            source: this.keywordTweets,
            date: { ge: timestamp },
            limit: 10,
          },
        });
        //console.log(this.tweets.length);
        this.tweets = tweet.data.tweetsByMostRecent.items;
      } catch (e) {
        console.error(e);
      }
    },
    getTwitterUsers: async function () {
      var timestamp = (+new Date/1000) - 86400;
      try {
        console.log(this.keywordUser)
        this.keywordUser = this.keywordUser.toLowerCase();
        const tweet = await API.graphql({
          query: userTweetsByMostRecent,
          varibles: {
            username: this.keywordUser,
            date: { ge: timestamp },
            limit: 10,
          },
        });
        this.twitterUsers = tweet.data.userTweetsByMostRecent.items;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.tweetcontainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
}
.search-item-list {
  padding: 1em;
}
.search-item:hover {
  cursor: pointer;
  background-color: #6f36bc;
  transition: ease-in 0.1s;
}
.search-input-form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-alert {
  color: white;
}
.va-input-wrapper {
  margin-bottom: 0 !important;
}
.va-alert__content {
  display: flex;
  flex-direction: row;
}
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
.is-purple {
  color: #6f36bc;
}
.is-white {
  color: #ffffff;
}
</style>
