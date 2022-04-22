import { API } from "aws-amplify";
// import { listNfts, listCollections } from "../graphql/queries";
import { createNft, createNftAssetContract, createNftTraits, createCollection } from "../graphql/mutations";

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

export async function fetchNFTs(address, token_id = null) {
  try {
    debugger;
    var url = "https://api.opensea.io/api/v1/assets";

    var headers = {
      "Accept": "application/json",
      "X-API-KEY": "121e8a8126664ef8ab27769de9fc6549"
    }

    var query = "limit=20";
    query += "&asset_contract_address=" + address;

    if(token_id) query += "&token_ids=" + token_id;

    url += "?" + query;

    var data = await fetch(url, {
      method: "GET",
      headers: headers
    })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    });

    var [contractItem, nftItems, nftTraits] = parseNfts(data, address);
    console.log(nftTraits, contractItem);
    if(nftItems.length > 0) {
      nftItems.forEach((item) => {
        var traits = item['traits'];
        delete item['traits'];

        try {
          const result = API.graphql({
            query: createNft,
            variables: { input: item },
          })
          .then((res) => {
            return res;
          });
          console.log(result);
        } catch(e) { console.log(e); };

        try {
          traits.forEach((trait) => {
            const tResult = API.graphql({
              query: createNftTraits,
              variables: { input: trait },
            })
            .then((tres) => {
              return tres;
            });
            console.log(tResult);
          });
        } catch(e) { console.log(e); };
      });

      const contractResult = API.graphql({
        query: createNftAssetContract,
        variables: { input: contractItem }
      })
      .then((contractResult) => {
        console.log(contractResult);
      });
      console.log(contractResult);

      var collectionSlug = nftItems[0]['collection_slug'];
      var collectionData = await getCollection(collectionSlug);
      var [collectionItem, collectionTraits] = parseCollection(collectionData, collectionSlug);
      debugger;
      const collectionResult = API.graphql({
        query: createCollection,
        variables: { input: collectionItem }
      })
      .then((cRes) => {
        console.log(cRes);
      });

      console.log(collectionResult);

      collectionTraits.forEach((trait) => {
        const traitResult = API.graphql({
          query: createNftTraits,
          variables: { input: trait }
        })
        .then((ctResult) => { console.log(ctResult) });
        console.log(traitResult);
      });
    }

    return {ok: true};
  } catch(e) { return {ok: false}; }
}

function parseCollection(collectionData) {
  var collection = collectionData['collection'];
  var id = collection['slug'];
  var slug = collection['slug'];
  var name = collection['name'];
  var traits = collection['traits'];
  var description = collection['description'];
  var image_url = collection['image_url'];
  var external_url = collection['external_url'];

  delete collection['traits'];
  delete collection['stats'];

  var collectionItem = {
    id,
    slug,
    name,
    description,
    image_url,
    external_url
  }

  var collectionTraits = parseCollectionTraits(traits, slug);

  return [collectionItem, collectionTraits];
}

function parseTraits(traits, idPrefix) {
  var nftTraits = [];
  traits.forEach((trait) => {
    var traitId = idPrefix + "-" + nftTraits.length;
    var trait_type = trait["trait_type"];
    var value = trait['value']
    var trait_count = trait['trait_count'];

    nftTraits.push({'id': traitId, trait_type, value, trait_count});
  });

  return nftTraits;
}

function parseCollectionTraits(traits, idPrefix) {
  var collectionTraits = [];
  var traitTypes = Object.keys(traits);

  traitTypes.forEach((trait_type) => {
    var collectionTrait = traits[trait_type];
    var values = Object.keys(collectionTrait);
    values.forEach((value) => {
      var trait_count = collectionTrait[value];
      collectionTraits.push({ 
        'id': idPrefix + "-" + collectionTraits.length,
        trait_type,
        value,
        trait_count
      })
    });
  });

  return collectionTraits;
}

function parseNfts(data, address) {
  debugger;
  var nfts = data["assets"];
  var nftItems = [];
  var nftTraits = [];
  nfts.forEach((nft) => {
    // Format data for our model
    var token_id = nft["token_id"];
    var name = nft["name"];
    if(name === "" || !name) name = token_id;
    if(isNaN(token_id) || token_id >= 100000) {
      token_id = nftItems.length;
    }
    var id = address + "-" + nft["token_id"];
    var num_sales = nft["num_sales"]
    var image_url = nft["image_url"];
    var owner = "None";
    if(nft['owner'] && nft['owner']['address']) owner = nft['owner']['address'];

    var collection = nft["collection"];
    var collection_slug = collection['slug'];
    var collection_name = collection['name'];
    var collection_description = collection['description'];

    var traits = nft["traits"];

    nftTraits = parseTraits(traits, id);

    nftItems.push({
      id,
      address,
      asset_contract_type,
      token_id,
      num_sales,
      collection_slug,
      collection_name,
      collection_description,
      image_url,
      name,
      owner,
      'traits': nftTraits
    });
  });

  var contract = nfts[0]['asset_contract'];
  var contractId = address;
  var slug = nftItems[0]['collection_slug'];
  var contractName = contract['name'];
  var symbol = contract['symbol'];
  var payout_address = "None";
  if(contract['payout_address']) payout_address = contract['payout_address'];
  var asset_contract_type = "Unknown";
  if(contract['asset_contract_type']) asset_contract_type = contract['asset_contract_type'];
  var created_date = contract['created_date'];
  var image_url = contract['image_url'];
  var external_link = contract['external_link'];

  var contractItem = {
    'id': contractId,
    slug,
    address,
    'name': contractName,
    symbol,
    created_date,
    image_url,
    payout_address,
    external_link
  }

  return [contractItem, nftItems, nftTraits];
}

export async function getCollection(collectionSlug) {
  var url = "https://api.opensea.io/api/v1/collection/" + collectionSlug;

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