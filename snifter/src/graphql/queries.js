/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchCollections = /* GraphQL */ `
  query SearchCollections(
    $filter: SearchablecollectionFilterInput
    $sort: [SearchablecollectionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablecollectionAggregationInput]
  ) {
    searchCollections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
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
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const searchTransactions = /* GraphQL */ `
  query SearchTransactions(
    $filter: SearchableTransactionFilterInput
    $sort: [SearchableTransactionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableTransactionAggregationInput]
  ) {
    searchTransactions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        block_hash
        transaction_hash
        block_number
        from_account
        to_account
        transaction_index
        timestamp
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const searchNftEvents = /* GraphQL */ `
  query SearchNftEvents(
    $filter: SearchablenftEventFilterInput
    $sort: [SearchablenftEventSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablenftEventAggregationInput]
  ) {
    searchNftEvents(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        event_type
        auction_type
        bid_amount
        collection_slug
        contract_address
        listing_time
        address
        token_id
        created_date
        from_account
        to_account
        is_private
        total_price
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
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
      id
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
        id
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
      id
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
        id
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
        createdAt
        updatedAt
      }
      description
      image_url
      external_url
      primary_asset_contracts {
        nextToken
      }
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
        id
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
          id
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
      }
      nextToken
    }
  }
`;
export const getNftAssetContract = /* GraphQL */ `
  query GetNftAssetContract($id: ID!) {
    getNftAssetContract(id: $id) {
      id
      slug
      address
      nfts {
        nextToken
      }
      name
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
      collection {
        id
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
      }
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
        id
        slug
        address
        name
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
      address
      token_id
      num_sales
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
      primary_asset_contract {
        id
        slug
        address
        name
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
      }
      owner
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
      favorited_by {
        nextToken
      }
      watched_by {
        nextToken
      }
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
        address
        token_id
        num_sales
        background_color
        image_url
        image_preview_url
        image_thumbnail_url
        image_original_url
        animation_url
        animation_original_url
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
        favorited_by {
          nextToken
        }
        watched_by {
          nextToken
        }
        description
        external_link
        perma_link
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      block_hash
      transaction_hash
      block_number
      from_account
      to_account
      transaction_index
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        block_hash
        transaction_hash
        block_number
        from_account
        to_account
        transaction_index
        timestamp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNftEvent = /* GraphQL */ `
  query GetNftEvent($id: ID!) {
    getNftEvent(id: $id) {
      id
      event_type
      auction_type
      bid_amount
      collection_slug
      contract_address
      listing_time
      address
      token_id
      created_date
      from_account
      to_account
      is_private
      transaction {
        id
        block_hash
        transaction_hash
        block_number
        from_account
        to_account
        transaction_index
        timestamp
        createdAt
        updatedAt
      }
      total_price
      createdAt
      updatedAt
    }
  }
`;
export const listNftEvents = /* GraphQL */ `
  query ListNftEvents(
    $filter: ModelNftEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNftEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        event_type
        auction_type
        bid_amount
        collection_slug
        contract_address
        listing_time
        address
        token_id
        created_date
        from_account
        to_account
        is_private
        total_price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNftEventCheckpoint = /* GraphQL */ `
  query GetNftEventCheckpoint($id: ID!) {
    getNftEventCheckpoint(id: $id) {
      id
      saved_events
      total_events
      status
      createdAt
      updatedAt
    }
  }
`;
export const listNftEventCheckpoints = /* GraphQL */ `
  query ListNftEventCheckpoints(
    $filter: ModelNftEventCheckpointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNftEventCheckpoints(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        saved_events
        total_events
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      favorite_nfts {
        nextToken
      }
      watchlist_nfts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserFavoriteNft = /* GraphQL */ `
  query GetUserFavoriteNft($id: ID!) {
    getUserFavoriteNft(id: $id) {
      id
      nftID
      userID
      nft {
        id
        address
        token_id
        num_sales
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
        owner
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserFavoriteNfts = /* GraphQL */ `
  query ListUserFavoriteNfts(
    $filter: ModelUserFavoriteNftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserFavoriteNfts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nftID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserWatchlistNft = /* GraphQL */ `
  query GetUserWatchlistNft($id: ID!) {
    getUserWatchlistNft(id: $id) {
      id
      nftID
      userID
      nft {
        id
        address
        token_id
        num_sales
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
        owner
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserWatchlistNfts = /* GraphQL */ `
  query ListUserWatchlistNfts(
    $filter: ModelUserWatchlistNftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserWatchlistNfts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nftID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
