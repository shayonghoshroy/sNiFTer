/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTweet = /* GraphQL */ `
  query GetTweet($id: ID!) {
    getTweet(id: $id) {
      id
      text
      username
      reply_count
      retweet_count
      like_count
      interaction_count
      createdAt
      updatedAt
      date
    }
  }
`;
export const listTweets = /* GraphQL */ `
  query ListTweets(
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        username
        reply_count
        retweet_count
        like_count
        interaction_count
        createdAt
        updatedAt
        date
      }
      nextToken
    }
  }
`;
export const getNftAssetContract = /* GraphQL */ `
  query GetNftAssetContract($id: ID!) {
    getNftAssetContract(id: $id) {
      name
      address
      symbol
      payout_address
      asset_contract_type
      created_date
      description
      image_url
      total_supply
      nft_version
      opensea_version
      schema_name
      external_link
      id
      createdAt
      updatedAt
    }
  }
`;
export const listNftAssetContracts = /* GraphQL */ `
  query ListNftAssetContracts(
    $filter: ModelNftAssetContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNftAssetContracts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        name
        address
        symbol
        payout_address
        asset_contract_type
        created_date
        description
        image_url
        total_supply
        nft_version
        opensea_version
        schema_name
        external_link
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNftTraits = /* GraphQL */ `
  query GetNftTraits($id: ID!) {
    getNftTraits(id: $id) {
      id
      trait_type
      value
      display_type
      max_value
      trait_count
      order
      createdAt
      updatedAt
    }
  }
`;
export const listNftTraits = /* GraphQL */ `
  query ListNftTraits(
    $filter: ModelNftTraitsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNftTraits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        trait_type
        value
        display_type
        max_value
        trait_count
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNft = /* GraphQL */ `
  query GetNft($id: ID!) {
    getNft(id: $id) {
      id
      token_id
      num_sales
      address
      background_color
      image_url
      image_preview_url
      image_thumbnail_url
      image_original_url
      animation_url
      animation_original_url
      name
      description
      external_link
      perma_link
      createdAt
      updatedAt
    }
  }
`;
export const listNfts = /* GraphQL */ `
  query ListNfts(
    $filter: ModelNftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNfts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        token_id
        num_sales
        address
        background_color
        image_url
        image_preview_url
        image_thumbnail_url
        image_original_url
        animation_url
        animation_original_url
        name
        description
        external_link
        perma_link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
