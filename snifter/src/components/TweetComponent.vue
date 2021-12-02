<template>
  <div id="tweetcomponent">
    <div class="scrolling-component" ref="scrollComponent">
      <div class="post" v-for="item in tweets" :key="item.id">
        <h3>{{ item.username }}</h3>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

// <script>
// //import { API } from "aws-amplify";
// //import { listTweets } from "../graphql/queries";
// export default {
//   name: "TweetComponent",
//   async created() {
//     this.getTweets();
//   },
//   data() {
//     return {
//       username: "",
//       text: "",
//       tweets: [],
//     };
//   },
//   methods: {
//     async getTweets() {
//       const tweets = await API.graphql({
//         query: listTweets,
//       });
//       this.tweets = tweets.data.listTweets.items;
//     },
//   },
// };
// </script>
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
