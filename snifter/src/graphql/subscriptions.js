/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet {
    onCreateTweet {
      id
      source
      date
      text
      username
      retweet_count
      following_count
      followers_count
      favorite_count
      interaction_count
      total_tweets
      URL
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTweet = /* GraphQL */ `
  subscription OnUpdateTweet {
    onUpdateTweet {
      id
      source
      date
      text
      username
      retweet_count
      following_count
      followers_count
      favorite_count
      interaction_count
      total_tweets
      URL
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
      id
      source
      date
      text
      username
      retweet_count
      following_count
      followers_count
      favorite_count
      interaction_count
      total_tweets
      URL
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTwitterUser = /* GraphQL */ `
  subscription OnCreateTwitterUser {
    onCreateTwitterUser {
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
export const onUpdateTwitterUser = /* GraphQL */ `
  subscription OnUpdateTwitterUser {
    onUpdateTwitterUser {
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
export const onDeleteTwitterUser = /* GraphQL */ `
  subscription OnDeleteTwitterUser {
    onDeleteTwitterUser {
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
export const onCreateCollectionStats = /* GraphQL */ `
  subscription OnCreateCollectionStats {
    onCreateCollectionStats {
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
export const onUpdateCollectionStats = /* GraphQL */ `
  subscription OnUpdateCollectionStats {
    onUpdateCollectionStats {
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
export const onDeleteCollectionStats = /* GraphQL */ `
  subscription OnDeleteCollectionStats {
    onDeleteCollectionStats {
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
export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection {
    onCreateCollection {
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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection {
    onUpdateCollection {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection {
    onDeleteCollection {
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
export const onCreateNftAssetContract = /* GraphQL */ `
  subscription OnCreateNftAssetContract {
    onCreateNftAssetContract {
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
export const onUpdateNftAssetContract = /* GraphQL */ `
  subscription OnUpdateNftAssetContract {
    onUpdateNftAssetContract {
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
export const onDeleteNftAssetContract = /* GraphQL */ `
  subscription OnDeleteNftAssetContract {
    onDeleteNftAssetContract {
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
export const onCreateNftTraits = /* GraphQL */ `
  subscription OnCreateNftTraits {
    onCreateNftTraits {
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
export const onUpdateNftTraits = /* GraphQL */ `
  subscription OnUpdateNftTraits {
    onUpdateNftTraits {
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
export const onDeleteNftTraits = /* GraphQL */ `
  subscription OnDeleteNftTraits {
    onDeleteNftTraits {
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
export const onCreateNft = /* GraphQL */ `
  subscription OnCreateNft {
    onCreateNft {
      id
      address
      token_id
      num_sales
      collection_slug
      collection_name
      collection_description
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
export const onUpdateNft = /* GraphQL */ `
  subscription OnUpdateNft {
    onUpdateNft {
      id
      address
      token_id
      num_sales
      collection_slug
      collection_name
      collection_description
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
export const onDeleteNft = /* GraphQL */ `
  subscription OnDeleteNft {
    onDeleteNft {
      id
      address
      token_id
      num_sales
      collection_slug
      collection_name
      collection_description
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction {
    onCreateTransaction {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction {
    onUpdateTransaction {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction {
    onDeleteTransaction {
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
export const onCreateNftEvent = /* GraphQL */ `
  subscription OnCreateNftEvent {
    onCreateNftEvent {
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
export const onUpdateNftEvent = /* GraphQL */ `
  subscription OnUpdateNftEvent {
    onUpdateNftEvent {
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
export const onDeleteNftEvent = /* GraphQL */ `
  subscription OnDeleteNftEvent {
    onDeleteNftEvent {
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
export const onCreateNftEventCheckpoint = /* GraphQL */ `
  subscription OnCreateNftEventCheckpoint {
    onCreateNftEventCheckpoint {
      id
      saved_events
      total_events
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNftEventCheckpoint = /* GraphQL */ `
  subscription OnUpdateNftEventCheckpoint {
    onUpdateNftEventCheckpoint {
      id
      saved_events
      total_events
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNftEventCheckpoint = /* GraphQL */ `
  subscription OnDeleteNftEventCheckpoint {
    onDeleteNftEventCheckpoint {
      id
      saved_events
      total_events
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      email
      favorite_nfts {
        nextToken
      }
      watchlist_nfts {
        nextToken
      }
      completed_quizzes
      quiz_points
      hasImage
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      email
      favorite_nfts {
        nextToken
      }
      watchlist_nfts {
        nextToken
      }
      completed_quizzes
      quiz_points
      hasImage
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      email
      favorite_nfts {
        nextToken
      }
      watchlist_nfts {
        nextToken
      }
      completed_quizzes
      quiz_points
      hasImage
      createdAt
      updatedAt
    }
  }
`;
export const onCreateS3Object = /* GraphQL */ `
  subscription OnCreateS3Object {
    onCreateS3Object {
      id
      bucket
      region
      key
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateS3Object = /* GraphQL */ `
  subscription OnUpdateS3Object {
    onUpdateS3Object {
      id
      bucket
      region
      key
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteS3Object = /* GraphQL */ `
  subscription OnDeleteS3Object {
    onDeleteS3Object {
      id
      bucket
      region
      key
      createdAt
      updatedAt
    }
  }
`;
export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle {
    onCreateArticle {
      id
      title
      blurb
      questions
      answers
      category
      related_links
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle {
    onUpdateArticle {
      id
      title
      blurb
      questions
      answers
      category
      related_links
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle {
    onDeleteArticle {
      id
      title
      blurb
      questions
      answers
      category
      related_links
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz {
    onCreateQuiz {
      id
      title
      questions
      answers
      correct_answer
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz {
    onUpdateQuiz {
      id
      title
      questions
      answers
      correct_answer
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz {
    onDeleteQuiz {
      id
      title
      questions
      answers
      correct_answer
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserFavoriteNft = /* GraphQL */ `
  subscription OnCreateUserFavoriteNft {
    onCreateUserFavoriteNft {
      id
      nftID
      userID
      nft {
        id
        address
        token_id
        num_sales
        collection_slug
        collection_name
        collection_description
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
        completed_quizzes
        quiz_points
        hasImage
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserFavoriteNft = /* GraphQL */ `
  subscription OnUpdateUserFavoriteNft {
    onUpdateUserFavoriteNft {
      id
      nftID
      userID
      nft {
        id
        address
        token_id
        num_sales
        collection_slug
        collection_name
        collection_description
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
        completed_quizzes
        quiz_points
        hasImage
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserFavoriteNft = /* GraphQL */ `
  subscription OnDeleteUserFavoriteNft {
    onDeleteUserFavoriteNft {
      id
      nftID
      userID
      nft {
        id
        address
        token_id
        num_sales
        collection_slug
        collection_name
        collection_description
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
        completed_quizzes
        quiz_points
        hasImage
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserWatchlistNft = /* GraphQL */ `
  subscription OnCreateUserWatchlistNft {
    onCreateUserWatchlistNft {
      id
      nftID
      userID
      nft {
        id
        address
        token_id
        num_sales
        collection_slug
        collection_name
        collection_description
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
        completed_quizzes
        quiz_points
        hasImage
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserWatchlistNft = /* GraphQL */ `
  subscription OnUpdateUserWatchlistNft {
    onUpdateUserWatchlistNft {
      id
      nftID
      userID
      nft {
        id
        address
        token_id
        num_sales
        collection_slug
        collection_name
        collection_description
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
        completed_quizzes
        quiz_points
        hasImage
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserWatchlistNft = /* GraphQL */ `
  subscription OnDeleteUserWatchlistNft {
    onDeleteUserWatchlistNft {
      id
      nftID
      userID
      nft {
        id
        address
        token_id
        num_sales
        collection_slug
        collection_name
        collection_description
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
        completed_quizzes
        quiz_points
        hasImage
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
