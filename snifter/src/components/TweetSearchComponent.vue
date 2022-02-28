<template>
  <div class="tweetSearchComponent">
    <div class="search-wrapper">
      <va-button-dropdown
        :icon="searchTypes.at(searchIndex)[1]"
        :label="searchTypes.at(searchIndex)"
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
              <va-list-item-label>{{ type }}</va-list-item-label>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </va-button-dropdown>
      <div>
        <va-form class="search-input-form" v-if="searchIndex === 0">
          <va-input
            class="mb-4"
            v-model="keywordTweets"
            label="Tweet"
            placeholder="Required"
          />
        </va-form>
        <va-form class="search-input-form" v-else-if="searchIndex === 1">
          <va-input
            class="mb-4"
            v-model="keywordUser"
            label="Twitter User"
            placeholder="Required"
          />
        </va-form>
      </div>

      <va-button :disabled="disableSearch" @click="startSearch()">Search</va-button
      >
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listTweets } from "../graphql/queries";
import { fetchTweets, fetchTwitterUser } from "../services/tweetScraperService"
export default {
    name: "tweetSearchComponent",
    components: {},
    data() {
        return {
            keywordTweets: "",
            keywordUser: "",
            tweets: [],
            twitterUsers: [],
            searchTypes: ["Tweets", "TwitterUser"],
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
                    await this.getTweets();
                    // Fetch tweets from API
                    if(this.tweets.length === 0) {
                        event["searchStatus"] = "Fetching";
                        this.$emit("twitterSearch", event);
                        response = await fetchTweets(this.keywordTweets);
                        console.log(response);
                        //successful search
                        if (response.ok) {
                            console.log("here");
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
                        console.log(this.tweets);
                        this.$emit("twitterSearch", event);
                    }
                } else if (this.searchIndex === 1) {
                    event["searchType"] = "TwitterUser";
                    await this.getTwitterUsers();
                    debugger;
                    if (this.twitterUsers.length > 0) {
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
                    }
                }
            } catch (e) {
                event["searchStatus"] = "Failure";
                console.error(e)
                this.$emit("twitterSearch", event);
            }
            this.disableSearch = false;
        },
        getTweets: async function () {
            try {
                console.log("Starting Query");
                this.keywordTweets = this.keywordTweets.toLowerCase();
                
                const tweet = await API.graphql({
                    query: listTweets,
                    variables: {
                      filter: { text: { contains: this.keywordTweets } },
                    },
                });
                //console.log(this.tweets.length);
                this.tweets = tweet.data.listTweets.items;
            } catch (e) {
                console.error(e);
            }
        },
        getTwitterUsers: async function () {
            try {
                console.log("Starting Query");
                this.keywordUsers = this.keywordUsers.toLowerCase();
                const twitterUser = await API.graphql({
                  query: listTweets,
                  varibles: {
                    filter: { name: { eq: this.keywordUsers } },
                  },
                });
                this.twitterUsers = twitterUser.data.items
            } catch (e) {
                console.error(e);
            }
        }
    }
}
</script>

<style scoped>
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