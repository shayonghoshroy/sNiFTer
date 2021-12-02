from typing import Optional
from pydantic import BaseModel

class EthStats(BaseModel):
    blocks: int = None
    transactions: int = None
    blocks_24h: int = None
    circulation_approximate: str = None
    blockchain_size: int = None
    difficulty: int = None
    volume_24h_approximate: str = None
    average_transaction_fee_24h: str = None
    median_transaction_fee_24h: str = None
    average_transaction_fee_usd_24h: float = None
    median_transaction_fee_usd_24h: float = None
    market_price_usd: float = None
    market_price_usd_change_24h_percentage: float = None
    market_cap_usd: int = None
    market_dominance_percentage: float = None
    layer_2: dict = None