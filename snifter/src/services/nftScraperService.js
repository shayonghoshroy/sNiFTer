// import { API } from "aws-amplify";
// import { listNfts, listCollections } from "../graphql/queries";

export async function fetchCollection(collectionSlug) {
  var baseUrl = "https://qjlxkgsn7g.execute-api.us-east-2.amazonaws.com/dev";

  var endpoint = "/collection";

  var body = { "collection-slug": collectionSlug };

  return await fetch(baseUrl + endpoint, {
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

export async function fetchNFTs(address, tokenid) {
  var baseUrl = "https://qjlxkgsn7g.execute-api.us-east-2.amazonaws.com/dev";

  var endpoint = "/contract";

  var body = { "contract-addresses": [address] };
  if (tokenid !== "") {
    body["token-ids"] = [parseInt(tokenid)];
  }

  return await fetch(baseUrl + endpoint, {
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
      console.log(error);
      return { ok: false };
    });
}

export async function nftEventQueue(body) {
  var baseUrl = "https://qjlxkgsn7g.execute-api.us-east-2.amazonaws.com/dev";

  var endpoint = "/nftevent";

  return await fetch(baseUrl + endpoint, {
    method: "POST",
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
      console.log(error);
      return { ok: false };
    });
}
