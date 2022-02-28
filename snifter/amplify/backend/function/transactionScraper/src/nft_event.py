from typing import Optional
from pydantic import BaseModel
import hashlib

from pprint import pprint

from decimal import Decimal

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
        
        from_account = data["from_account"]
        if not isinstance(from_account, str):
            from_account = data["from_account"]["address"]
            
        to_account = data["to_account"]
        if not isinstance(to_account, str):
            to_account = data["to_account"]["address"]
        
        data["from_account"] = from_account
        data["to_account"] = to_account

        super().__init__(**data)

class NFTEvent(BaseModel):
    id: str
    event_type: str
    auction_type: Optional[str]
    bid_amount: Optional[Decimal]
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
    total_price: Optional[Decimal]

    def __init__(self, new_item=False, **data: dict) -> None:
        if new_item:
            data.setdefault('is_private', False)
            
            # Convert total price from gweith to eth
            total_price = data.get('total_price', None)
            if total_price is not None:
                data['total_price'] = Decimal(str(round(float(total_price) / 10e17, 6)))
            else:
                data['total_price'] = Decimal(str(round(0.0, 2)))

            bid_amount = data.get('bid_amount', None)
            if bid_amount is not None:
                data['bid_amount'] = Decimal(str(round(float(bid_amount) / 10e17, 6)))
            else:
                data['bid_amount'] = Decimal(str(round(0.0, 2)))
    
            transaction = data.get('transaction', None)
            if transaction is not None:
                data['transaction'] = dict(Transaction(**dict(transaction)))
            
            from_account = data.get('from_account', None)
            if from_account is not None:
                data['from_account'] = from_account['address']
    
            to_account = data.get('to_account', None)
            if to_account is not None:
                data['to_account'] = to_account['address']
    
            # Attempt to collect asset information
            asset = data.get('asset', None)
            if asset is not None:
                token_id = asset.get('token_id', None)
                data['token_id'] = int(token_id) if token_id is not None else None
                
                contract = asset.get('asset_contract', None)
                if contract is not None:
                    contract_address = contract.get('address', None)
                    data['contract_address'] = contract_address if contract_address is not None else None
                
                collection = asset.get('collection', None)
                if collection is not None:
                    collection_slug = collection.get('slug', None)
                    data['collection_slug'] = collection_slug if collection_slug is not None else None
                
            data['id'] = self.get_encoded_id(data)
    
        super().__init__(**data)

    def get_encoded_id(self, data: dict):
        '''
        NFT Events do not contain their own identifier.
        Along with this, there is not a way to identify consistantly which fields will be present with other fields.
        In order to guarantee uniqueness, while ensuring efficient id storage, we will calculate a hash for the
        non-null fields within the NFTEvent object.

        This guarantees uniqueness, is deterministic (the same input produces the same output) and is of fixed length (64).
        '''

        # Order that fields should be appended to decoded id string
        field_order = [
            'event_type',
            'auction_type',
            'bid_amount',
            'collection_slug',
            'contract_address',
            'listing_time',
            'address',
            'token_id',
            'created_date',
            'from_account',
            'to_account',
            'is_private',
            'transaction',
            'total_price'
        ]

        # Grab non-null values in order
        decoded_id = ''
        for field in field_order:
            val = data.get(field, None)
            if val is not None:
                # Append only the values to the decoded id
                if field != 'transaction':
                    decoded_id += f"-{val}"

                # Append the hashes of the transactions
                else:
                    decoded_id += f"-{val['block_hash']}"

        # Calculate sha256 id (hash)
        encoded_id = hashlib.sha256(decoded_id.encode('utf-8')).hexdigest()

        return encoded_id
    
    def format_dict(data: dict):
        # Convert total price from gweith to eth
        total_price = data.get('total_price', None)
        if total_price is not None:
            data['total_price'] = Decimal(str(round(float(total_price) / 10e17, 2)))
        else:
            data['total_price'] = Decimal(str(round(0.0, 4)))

        bid_amount = data.get('bid_amount', None)
        if bid_amount is not None:
            data['bid_amount'] = Decimal(str(round(float(bid_amount) / 10e17, 2)))
        else:
            data['bid_amount'] = Decimal(str(round(0.0, 4)))
            
        return data
