class TransactionEvent:
    
    def __init__(self, **kwargs):
        self.asset_contract_address = kwargs.get('asset-contract-address', None)
        self.token_id = kwargs.get('token-id', None)
        self.collection_slug = kwargs.get('collection-slug', None)
        self.account_address = kwargs.get('account-address', None)
        self.event_type = kwargs.get('event-type', None)
        self.only_opensea = kwargs.get('only-opensea', None)
        self.auction_type = kwargs.get('auction-type', None)
        self.limit = kwargs.get('limit', 300)
        self.offset = kwargs.get('offset', 0)
    
    # Makes class castable to dict    
    def __iter__(self):
        yield 'asset_contract_address', self.asset_contract_address
        yield 'token_id', self.token_id
        yield 'collection_slug', self.collection_slug
        yield 'account_address', self.account_address
        yield 'event_type', self.event_type
        yield 'only_opensea', self.only_opensea
        yield 'auction_type', self.auction_type
        yield 'limit', self.limit
        yield 'offset', self.offset
        