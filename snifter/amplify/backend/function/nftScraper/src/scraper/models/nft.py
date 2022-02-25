from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
import uuid

class NFTAssetContract(BaseModel):
    id: str
    name: str
    address: str
    symbol: str
    payout_address: Optional[str]
    asset_contract_type: str
    created_date: str
    description: str
    slug: str
    image_url: Optional[str]

    total_supply: Optional[str]
    nft_version: Optional[str]
    opensea_version: Optional[str]
    schema_name: Optional[str]
    external_link: Optional[str]
    
    def __init__(self, **data):
        data['id'] = f"{data['address']}-{data['name']}"
        super().__init__(**data)

class NFTTraits(BaseModel):
    id: str
    trait_type: str
    value: str

    display_type: Optional[str]
    max_value: Optional[str]
    trait_count: Optional[int]
    order: Optional[str]
    
    def __init__(self, **data: dict) -> None:
        data['id'] = str(uuid.uuid4())

        super().__init__(**data)

class NFT(BaseModel):
    id: str
    token_id: int
    num_sales: int
    address: str
    owner: str

    image_url: Optional[str]
    image_preview_url: Optional[str]
    image_thumbnail_url: Optional[str]
    image_original_url: Optional[str]
    name: Optional[str]
    description: Optional[str]
    external_link: Optional[str]
    perma_link: Optional[str]
    background_color: Optional[str]
    traits: Optional[List[NFTTraits]]
    
    def __init__(self, **data):
        data['id'] = f"{data['address']}-{data['token_id']}"

        owner = data.get('owner', None)
        if owner is not None:
            data['owner'] = owner['address']
        else:
            data['owner'] = 'No Owner'

        traits = data.get('traits', None)
        if traits is not None and len(traits) > 0:
            nft_traits = []
            for trait in traits:
                nft_traits.append(NFTTraits(**trait))
            data['traits'] = nft_traits
        
        super().__init__(**data)
    