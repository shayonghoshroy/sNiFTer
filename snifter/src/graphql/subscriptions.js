/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet {
    onCreateTweet {
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
export const onUpdateTweet = /* GraphQL */ `
  subscription OnUpdateTweet {
    onUpdateTweet {
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
export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      username
      favorite_nfts {
        nextToken
      }
      watchlist_nfts {
        nextToken
      }
      createdAt
      updatedAt
      id
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      username
      favorite_nfts {
        nextToken
      }
      watchlist_nfts {
        nextToken
      }
      createdAt
      updatedAt
      id
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      username
      favorite_nfts {
        nextToken
      }
      watchlist_nfts {
        nextToken
      }
      createdAt
      updatedAt
      id
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
      createdAt
      updatedAt
      favorited_by {
        nextToken
      }
      watched_by {
        nextToken
      }
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
      createdAt
      updatedAt
      favorited_by {
        nextToken
      }
      watched_by {
        nextToken
      }
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
      createdAt
      updatedAt
      favorited_by {
        nextToken
      }
      watched_by {
        nextToken
      }
    }
  }
`;
export const onCreateUserFavoriteNft = /* GraphQL */ `
  subscription OnCreateUserFavoriteNft {
    onCreateUserFavoriteNft {
      id
      userID
      nftID
      user {
        username
        createdAt
        updatedAt
        id
      }
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
      userID
      nftID
      user {
        username
        createdAt
        updatedAt
        id
      }
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
      userID
      nftID
      user {
        username
        createdAt
        updatedAt
        id
      }
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
      userID
      nftID
      user {
        username
        createdAt
        updatedAt
        id
      }
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
      userID
      nftID
      user {
        username
        createdAt
        updatedAt
        id
      }
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
      userID
      nftID
      user {
        username
        createdAt
        updatedAt
        id
      }
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
