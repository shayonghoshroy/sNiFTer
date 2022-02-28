import uuid
from pydantic import BaseModel
from datetime import datetime

from typing import List, Optional

from .nft import NFT, NFTTraits

class PaymentToken(BaseModel):
    id: str
    name: str
    symbol: str
    address: str
    image_url: str = None
    
    decimals: float = None
    eth_price: float = None
    usd_price: float = None

    def __init__(__pydantic_self__, **data) -> None:
        data['id'] = f"{data['address']}-{data['symbol']}"

        super().__init__(**data)

class PrimaryAssetContracts(BaseModel):
    id: str

    address: str
    asset_contract_type: str
    created_at: datetime = None
    name: str
    nft_version: str = None
    opensea_version: str = None
    owner: int = None
    schema_name: str = None
    symbol: str
    total_supply: int = None
    description: str = None
    external_link: str = None
    image_url: str
    default_to_fiat: bool
    payout_address: str

    def __init__(self, **data) -> None:
        data['id'] = f"{data['address']}-{data['name']}"

        super().__init__(**data)

class CollectionStats(BaseModel):
    id: str = str(uuid.uuid4())

    one_day_volume: float = 0
    one_day_change: float = 0
    one_day_sales: int = 0
    one_day_average_price: float = 0
    seven_day_volume: float = 0
    seven_day_change: float = 0
    seven_day_sales: int = 0
    seven_day_average_price: float = 0
    thirty_day_volume: float = 0
    thirty_day_change: float = 0
    thirty_day_sales: int = 0
    thirty_day_average_price: float = 0
    total_volume: float = 0
    total_sales: int = 0
    total_supply: int = 0
    count: int = 0
    num_owners: int = 0
    average_price: float = 0
    num_reports: int = 0
    market_cap: float = 0
    floor_price: int = 0


class Collection(BaseModel):
    id: str
    editors: List[str] = []
    slug: str
    name: str
    traits: Optional[List[NFTTraits]]
    stats: CollectionStats
    description: str
    image_url: str = None
    external_url: str = None
    payment_tokens: List[PaymentToken]
    primary_asset_contracts: List[PrimaryAssetContracts]
    banner_image_url: str = None
    chat_url: str = None
    created_date: datetime = None
    default_to_fiat: bool = False
    discord_url: str = None
    featured: bool = False
    featured_image_url: str = None
    large_image_url: str = None
    payout_address: str
    telegram_url: str = None
    twitter_username: str = None
    instagram_username: str = None
    wiki_url: str = None

    def __init__(self, **data) -> None:
        data['id'] = f"{data['slug']}-{data['name']}"

        # Set collections slugs for model relationship in graphql
        asset_contracts = data['primary_asset_contracts']
        data['primary_asset_contracts'] = [(lambda contract: contract.update({'slug': data['slug']}) or contract)(contract) for contract in asset_contracts]

        traits = data.get('traits', None)
        if traits is not None:
            formatted_traits = []
            for trait_type, trait in traits.items():
                for value, count in trait.items():
                    formatted_traits.append(NFTTraits(**{'trait_type':trait_type, 'value': value, 'trait_count': count}))
            data['traits'] = formatted_traits

        super().__init__(**data)
   