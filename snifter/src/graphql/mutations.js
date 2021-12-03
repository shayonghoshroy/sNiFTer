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
export const updateTweet = /* GraphQL */ `
  mutation UpdateTweet(
    $input: UpdateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    updateTweet(input: $input, condition: $condition) {
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
export const deleteTweet = /* GraphQL */ `
  mutation DeleteTweet(
    $input: DeleteTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    deleteTweet(input: $input, condition: $condition) {
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
export const createNftAssetContract = /* GraphQL */ `
  mutation CreateNftAssetContract(
    $input: CreateNftAssetContractInput!
    $condition: ModelNftAssetContractConditionInput
  ) {
    createNftAssetContract(input: $input, condition: $condition) {
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
export const updateNftAssetContract = /* GraphQL */ `
  mutation UpdateNftAssetContract(
    $input: UpdateNftAssetContractInput!
    $condition: ModelNftAssetContractConditionInput
  ) {
    updateNftAssetContract(input: $input, condition: $condition) {
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
export const deleteNftAssetContract = /* GraphQL */ `
  mutation DeleteNftAssetContract(
    $input: DeleteNftAssetContractInput!
    $condition: ModelNftAssetContractConditionInput
  ) {
    deleteNftAssetContract(input: $input, condition: $condition) {
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
export const updateNft = /* GraphQL */ `
  mutation UpdateNft(
    $input: UpdateNftInput!
    $condition: ModelNftConditionInput
  ) {
    updateNft(input: $input, condition: $condition) {
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
export const deleteNft = /* GraphQL */ `
  mutation DeleteNft(
    $input: DeleteNftInput!
    $condition: ModelNftConditionInput
  ) {
    deleteNft(input: $input, condition: $condition) {
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
