// import { API } from "aws-amplify";
// import { listTweets } from "../graphql/queries.js";

// Uses the graphql query to get the tweets from the database
const getTweets = async () => {
  //tweets have the following structure:
  // {
  //   username: "",
  //   text: "",
  //   retweet_count: 0,
  //   reply_count: 0,
  //   like_count: 0,
  //   interaction_count: 0,
  const tweets = await API.graphql({
    query: listTweets,
    variables: {
      limit: 10,
      nextToken: null,
    },
  });

  //for loop grabs the username and text from the tweets and puts them int array ret
  let ret = [];
  for (let i = 0; i < tweets.data.listTweets.items.length; i++) {
    ret.push({
      username: tweets.data.listTweets.items[i].username,
      text: tweets.data.listTweets.items[i].text,
    });
  }

  return ret;
};

export default getTweets();
