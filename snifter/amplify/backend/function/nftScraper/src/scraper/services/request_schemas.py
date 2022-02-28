from pydantic import BaseModel

class EventRequest(BaseModel):
    event_type: str = None
    contract_address: str = None
    only_opensea: bool = None
    token_id: int = None
    account_address: str = None
    collection_slug: str = None
    auction_type: str = None
    occurred_before: int = None
    occurred_after: int = None
    offset: int = 0
    limit: int = 20

class AssetsRequest(BaseModel):
    collection: str = None
    order_by: str = None
    order_direction: str = None
    offset: str = None
    limit: int = None
    owner: str = None
