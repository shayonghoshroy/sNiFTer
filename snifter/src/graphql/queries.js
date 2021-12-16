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
export const getCollectionStats = /* GraphQL */ `
  query GetCollectionStats($id: ID!) {
    getCollectionStats(id: $id) {
      one_day_volume
      one_day_change
      one_day_sales
      one_day_average_price
      seven_day_volume
      seven_day_change
      seven_day_sales
      seven_day_average_price
      thirty_day_volume
      thirty_day_change
      thirty_day_sales
      thirty_day_average_price
      total_volume
      total_sales
      total_supply
      count
      num_owners
      average_price
      num_reports
      market_cap
      floor_price
      id
      createdAt
      updatedAt
    }
  }
`;
export const listCollectionStats = /* GraphQL */ `
  query ListCollectionStats(
    $filter: ModelCollectionStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionStats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        one_day_volume
        one_day_change
        one_day_sales
        one_day_average_price
        seven_day_volume
        seven_day_change
        seven_day_sales
        seven_day_average_price
        thirty_day_volume
        thirty_day_change
        thirty_day_sales
        thirty_day_average_price
        total_volume
        total_sales
        total_supply
        count
        num_owners
        average_price
        num_reports
        market_cap
        floor_price
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      slug
      name
      traits {
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
      stats {
        one_day_volume
        one_day_change
        one_day_sales
        one_day_average_price
        seven_day_volume
        seven_day_change
        seven_day_sales
        seven_day_average_price
        thirty_day_volume
        thirty_day_change
        thirty_day_sales
        thirty_day_average_price
        total_volume
        total_sales
        total_supply
        count
        num_owners
        average_price
        num_reports
        market_cap
        floor_price
        id
        createdAt
        updatedAt
      }
      description
      image_url
      external_url
      banner_image_url
      char_url
      created_date
      discord_url
      featured
      featured_image_url
      payout_address
      telegram_url
      twitter_username
      instagram_username
      wiki_url
      createdAt
      updatedAt
      id
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        slug
        name
        description
        image_url
        external_url
        banner_image_url
        char_url
        created_date
        discord_url
        featured
        featured_image_url
        payout_address
        telegram_url
        twitter_username
        instagram_username
        wiki_url
        createdAt
        updatedAt
        id
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
      createdAt
      updatedAt
      id
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
        createdAt
        updatedAt
        id
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
