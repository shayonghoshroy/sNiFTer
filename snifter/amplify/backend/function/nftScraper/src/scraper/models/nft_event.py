from typing import Optional
from pydantic import BaseModel
import uuid

class Transaction(BaseModel):
    id: str
    block_hash: str
    block_number: int
    from_account: str
    to_account: str
    transaction_hash: str
    transaction_index: int
    timestamp: str

    def __init__(self, **data: dict) -> None:
        data['id'] = f"{data['block_hash']}-{data['block_number']}"

        data['block_number'] = int(data['block_number'])
        data['transaction_index'] = int(data['transaction_index'])

        from_account = data['from_account']['address']
        to_account = data['to_account']['address']

        data['from_account'] = from_account
        data['to_account'] = to_account

        super().__init__(**data)

class NFTEvent(BaseModel):
    id: str
    event_type: str
    auction_type: Optional[str]
    bid_amount: Optional[int]
    collection_slug: Optional[str]
    contract_address: Optional[str]
    listing_time: Optional[str]
    address: Optional[str]
    token_id: Optional[int]
    created_date: Optional[str]
    from_account: Optional[str]
    to_account: Optional[str]
    is_private: Optional[bool]
    transaction: Optional[Transaction]
    total_price: int

    def __init__(self, **data: dict) -> None:
        data.setdefault('is_private', False)
        data.setdefault('total_price', 0)
        data.setdefault('id', data['event_type'] + str(uuid.uuid4()))

        transaction = data.get('transaction', None)
        if transaction is not None:
            transaction = Transaction(**data['transaction'])
        
        from_account = data.get('from_account', None)
        if from_account is not None:
            from_account = from_account['address']

        to_account = data.get('to_account', None)
        if to_account is not None:
            to_account = to_account['address']

        token_id = data.get('token_id', None)
        if token_id is not None:
            data['token_id'] = int(token_id)

        super().__init__(**data)
