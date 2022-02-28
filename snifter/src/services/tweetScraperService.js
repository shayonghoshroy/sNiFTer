export async function fetchTweets(keyWord) {

    var baseURL = "https://6dggs8nqwl.execute-api.us-east-2.amazonaws.com/dev"

    var endpoint = "/tweet"

    var body = {"word": [keyWord], "numtweet": 10}

    return await fetch(baseURL + endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
      .then((response) => {
          return response;
      })
      .then((data) => data)
      .catch((error) => {
          console.log("Error:", error.statusCode);
      });
}

export async function fetchTwitterUser(keyWord) {

    var baseURL = "https://6dggs8nqwl.execute-api.us-east-2.amazonaws.com/dev"

    var endpoint = "/twitteruser"

    var body = {"word": [keyWord], "numtweet": 10}

    return await fetch(baseURL + endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
      .then((response) => {
          return response;
      })
      .then((data) => data)
      .catch((error) => {
          console.log("Error:", error.statusCode)
      })
}