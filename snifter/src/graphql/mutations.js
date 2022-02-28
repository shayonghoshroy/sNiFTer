/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTweet = /* GraphQL */ `
  mutation CreateTweet(
    $input: CreateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    createTweet(input: $input, condition: $condition) {
      id
      text
      username
      retweet_count
      following_count
      followers_count
      favorite_count
      total_tweets
      URL
      createdAt
      updatedAt
      date
    }
  }
`;
export const updateTweet = /* GraphQL */ `
  mutation UpdateTweet(
    $input: UpdateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    updateTweet(input: $input, condition: $condition) {
      id
      text
      username
      retweet_count
      following_count
      followers_count
      favorite_count
      total_tweets
      URL
      createdAt
      updatedAt
      date
    }
  }
`;
export const deleteTweet = /* GraphQL */ `
  mutation DeleteTweet(
    $input: DeleteTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    deleteTweet(input: $input, condition: $condition) {
      id
      text
      username
      retweet_count
      following_count
      followers_count
      favorite_count
      total_tweets
      URL
      createdAt
      updatedAt
      date
    }
  }
`;
export const createTwitterUser = /* GraphQL */ `
  mutation CreateTwitterUser(
    $input: CreateTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    createTwitterUser(input: $input, condition: $condition) {
      id
      name
      screen_name
      location
      description
      URL
      followers
      friends_count
      listed_count
      acct_created_at
      verified
      createdAt
      updatedAt
    }
  }
`;
export const updateTwitterUser = /* GraphQL */ `
  mutation UpdateTwitterUser(
    $input: UpdateTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    updateTwitterUser(input: $input, condition: $condition) {
      id
      name
      screen_name
      location
      description
      URL
      followers
      friends_count
      listed_count
      acct_created_at
      verified
      createdAt
      updatedAt
    }
  }
`;
export const deleteTwitterUser = /* GraphQL */ `
  mutation DeleteTwitterUser(
    $input: DeleteTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    deleteTwitterUser(input: $input, condition: $condition) {
      id
      name
      screen_name
      location
      description
      URL
      followers
      friends_count
      listed_count
      acct_created_at
      verified
      createdAt
      updatedAt
    }
  }
`;
export const createCollectionStats = /* GraphQL */ `
  mutation CreateCollectionStats(
    $input: CreateCollectionStatsInput!
    $condition: ModelCollectionStatsConditionInput
  ) {
    createCollectionStats(input: $input, condition: $condition) {
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
export const updateCollectionStats = /* GraphQL */ `
  mutation UpdateCollectionStats(
    $input: UpdateCollectionStatsInput!
    $condition: ModelCollectionStatsConditionInput
  ) {
    updateCollectionStats(input: $input, condition: $condition) {
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
export const deleteCollectionStats = /* GraphQL */ `
  mutation DeleteCollectionStats(
    $input: DeleteCollectionStatsInput!
    $condition: ModelCollectionStatsConditionInput
  ) {
    deleteCollectionStats(input: $input, condition: $condition) {
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
export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
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
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
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
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
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
export const createNftAssetContract = /* GraphQL */ `
  mutation CreateNftAssetContract(
    $input: CreateNftAssetContractInput!
    $condition: ModelNftAssetContractConditionInput
  ) {
    createNftAssetContract(input: $input, condition: $condition) {
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
export const updateNftAssetContract = /* GraphQL */ `
  mutation UpdateNftAssetContract(
    $input: UpdateNftAssetContractInput!
    $condition: ModelNftAssetContractConditionInput
  ) {
    updateNftAssetContract(input: $input, condition: $condition) {
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
export const deleteNftAssetContract = /* GraphQL */ `
  mutation DeleteNftAssetContract(
    $input: DeleteNftAssetContractInput!
    $condition: ModelNftAssetContractConditionInput
  ) {
    deleteNftAssetContract(input: $input, condition: $condition) {
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
export const createNftTraits = /* GraphQL */ `
  mutation CreateNftTraits(
    $input: CreateNftTraitsInput!
    $condition: ModelNftTraitsConditionInput
  ) {
    createNftTraits(input: $input, condition: $condition) {
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
export const updateNftTraits = /* GraphQL */ `
  mutation UpdateNftTraits(
    $input: UpdateNftTraitsInput!
    $condition: ModelNftTraitsConditionInput
  ) {
    updateNftTraits(input: $input, condition: $condition) {
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
export const deleteNftTraits = /* GraphQL */ `
  mutation DeleteNftTraits(
    $input: DeleteNftTraitsInput!
    $condition: ModelNftTraitsConditionInput
  ) {
    deleteNftTraits(input: $input, condition: $condition) {
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
export const createNft = /* GraphQL */ `
  mutation CreateNft(
    $input: CreateNftInput!
    $condition: ModelNftConditionInput
  ) {
    createNft(input: $input, condition: $condition) {
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
export const updateNft = /* GraphQL */ `
  mutation UpdateNft(
    $input: UpdateNftInput!
    $condition: ModelNftConditionInput
  ) {
    updateNft(input: $input, condition: $condition) {
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
export const deleteNft = /* GraphQL */ `
  mutation DeleteNft(
    $input: DeleteNftInput!
    $condition: ModelNftConditionInput
  ) {
    deleteNft(input: $input, condition: $condition) {
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createNftEvent = /* GraphQL */ `
  mutation CreateNftEvent(
    $input: CreateNftEventInput!
    $condition: ModelNftEventConditionInput
  ) {
    createNftEvent(input: $input, condition: $condition) {
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
export const updateNftEvent = /* GraphQL */ `
  mutation UpdateNftEvent(
    $input: UpdateNftEventInput!
    $condition: ModelNftEventConditionInput
  ) {
    updateNftEvent(input: $input, condition: $condition) {
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
export const deleteNftEvent = /* GraphQL */ `
  mutation DeleteNftEvent(
    $input: DeleteNftEventInput!
    $condition: ModelNftEventConditionInput
  ) {
    deleteNftEvent(input: $input, condition: $condition) {
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
export const createNftEventCheckpoint = /* GraphQL */ `
  mutation CreateNftEventCheckpoint(
    $input: CreateNftEventCheckpointInput!
    $condition: ModelNftEventCheckpointConditionInput
  ) {
    createNftEventCheckpoint(input: $input, condition: $condition) {
      id
      saved_events
      total_events
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateNftEventCheckpoint = /* GraphQL */ `
  mutation UpdateNftEventCheckpoint(
    $input: UpdateNftEventCheckpointInput!
    $condition: ModelNftEventCheckpointConditionInput
  ) {
    updateNftEventCheckpoint(input: $input, condition: $condition) {
      id
      saved_events
      total_events
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteNftEventCheckpoint = /* GraphQL */ `
  mutation DeleteNftEventCheckpoint(
    $input: DeleteNftEventCheckpointInput!
    $condition: ModelNftEventCheckpointConditionInput
  ) {
    deleteNftEventCheckpoint(input: $input, condition: $condition) {
      id
      saved_events
      total_events
      status
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserFavoriteNft = /* GraphQL */ `
  mutation CreateUserFavoriteNft(
    $input: CreateUserFavoriteNftInput!
    $condition: ModelUserFavoriteNftConditionInput
  ) {
    createUserFavoriteNft(input: $input, condition: $condition) {
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
export const updateUserFavoriteNft = /* GraphQL */ `
  mutation UpdateUserFavoriteNft(
    $input: UpdateUserFavoriteNftInput!
    $condition: ModelUserFavoriteNftConditionInput
  ) {
    updateUserFavoriteNft(input: $input, condition: $condition) {
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
export const deleteUserFavoriteNft = /* GraphQL */ `
  mutation DeleteUserFavoriteNft(
    $input: DeleteUserFavoriteNftInput!
    $condition: ModelUserFavoriteNftConditionInput
  ) {
    deleteUserFavoriteNft(input: $input, condition: $condition) {
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
export const createUserWatchlistNft = /* GraphQL */ `
  mutation CreateUserWatchlistNft(
    $input: CreateUserWatchlistNftInput!
    $condition: ModelUserWatchlistNftConditionInput
  ) {
    createUserWatchlistNft(input: $input, condition: $condition) {
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
export const updateUserWatchlistNft = /* GraphQL */ `
  mutation UpdateUserWatchlistNft(
    $input: UpdateUserWatchlistNftInput!
    $condition: ModelUserWatchlistNftConditionInput
  ) {
    updateUserWatchlistNft(input: $input, condition: $condition) {
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
export const deleteUserWatchlistNft = /* GraphQL */ `
  mutation DeleteUserWatchlistNft(
    $input: DeleteUserWatchlistNftInput!
    $condition: ModelUserWatchlistNftConditionInput
  ) {
    deleteUserWatchlistNft(input: $input, condition: $condition) {
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
