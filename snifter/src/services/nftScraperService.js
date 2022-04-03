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
      Origin: "*",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response;
    })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return { ok: true, messageId: data["messageId"] };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false };
    });
}

export async function getNftEventsDirectly(token_id, asset_contract_address) {
  var url = "https://api.opensea.io/api/v1/events?" + "token_id=" + token_id + "&asset_contract_address=" + asset_contract_address;

  var sales_url = url += "&event_type=successful&limit=50";
  var bid_url = url += "&event_type=offer_entered&limit=150";
  
  var headers = {
    "Accept": "application/json",
    "X-API-KEY": "121e8a8126664ef8ab27769de9fc6549"
  }

  var sales = [];
  sales = await fetch(sales_url, {
    method: "GET",
    headers: headers,
  })
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data['asset_events'];
  });

  var bids = [];
  bids = await fetch(bid_url, {
    method: "GET",
    headers: headers,
  })
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data['asset_events'];
  });

  var events = bids.concat(sales);
  return events;
}

export async function getCollectionStatsDirectly(collectionSlug) {
  var url = "https://api.opensea.io/api/v1/collection/" + collectionSlug + "/stats";

  var headers = {
    "Accept": "application/json",
    "X-API-KEY": "121e8a8126664ef8ab27769de9fc6549"
  }

  return await fetch(url, {
    method: "GET",
    headers: headers
  })
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data;
  });
}