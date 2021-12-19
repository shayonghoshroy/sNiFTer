from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
import uuid

class NFTAssetContract(BaseModel):
    id: str
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
    
    def __init__(self, **data):
        data['id'] = f"{data['address']}-{data['name']}"
        super().__init__(**data)

class NFTTraits(BaseModel):
    id: str = str(uuid.uuid4())
    trait_type: str
    value: str

    display_type: Optional[str]
    max_value: Optional[str]
    trait_count: Optional[int]
    order: Optional[str]

class NFT(BaseModel):
    id: str
    token_id: int
    num_sales: int
    address: str

    image_url: Optional[str]
    image_preview_url: Optional[str]
    image_thumbnail_url: Optional[str]
    image_original_url: Optional[str]
    name: Optional[str]
    description: Optional[str]
    external_link: Optional[str]
    perma_link: Optional[str]
    
    def __init__(self, **data):
        data['id'] = f"{data['address']}-{data['token_id']}"
        
        super().__init__(**data)
    