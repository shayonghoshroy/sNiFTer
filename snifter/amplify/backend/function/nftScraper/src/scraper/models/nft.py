from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
import uuid

class NFTAssetContract(BaseModel):
    name: str
    address: str
    symbol: str
    payout_address: str
    asset_contract_type: str
    created_date: datetime
    description: str
    image_url: str

    total_supply: Optional[str]
    nft_version: Optional[str]
    opensea_version: Optional[str]
    schema_name: Optional[str]
    external_link: Optional[str]

class NFTTraits(BaseModel):
    trait_type: str
    value: str

    display_type: Optional[str]
    max_value: Optional[str]
    trait_count: Optional[int]
    order: Optional[str]

class NFT(BaseModel):
    id = str(uuid.uuid4())
    token_id: int
    num_sales: int

    background_color: Optional[str]
    image_url: Optional[str]
    image_preview_url: Optional[str]
    image_thumbnail_url: Optional[str]
    image_original_url: Optional[str]
    animation_url: Optional[str]
    animation_original_url: Optional[str]
    name: Optional[str]
    description: Optional[str]
    external_link: Optional[str]
    perma_link: Optional[str]

    asset_contract: NFTAssetContract
    traits: Optional[List[NFTTraits]]
    