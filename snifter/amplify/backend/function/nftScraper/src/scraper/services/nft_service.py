import enum

import asyncio

from .request_schemas import AssetsRequest, EventRequest

from ..models.nft import NFT, NFTAssetContract
from ..models.collection import Collection
from ..models.nft_event import NFTEvent

from ..apis.exceptions import APIException
from ..apis.block_chair import BlockChairAPI
from ..apis.opensea import OpenSeaAPI

class NFTService():
    def __init__(self) -> None:
        self.opensea_api = OpenSeaAPI()
        self.block_chair_api = BlockChairAPI()

    def function_switch(self, event_type: str, event: dict):
        loop = asyncio.get_event_loop()

        if event_type == "nft":
            contract_address = event.get("contract-address", None)
            token_id = event.get("token-id", None)
            print("Address: ", contract_address)
            print("Token ID: ", token_id)

            return loop.run_until_complete(self.get_asset(contract_address, token_id))

        elif event_type == "collection":
            collection_slug = event.pop("collection-slug")
            
            return loop.run_until_complete(self.get_nft_collection(collection_slug))
        
        elif event_type == "nftevent":
            contract_address = event.get("contract-address", None)
            collection_slug = event.get("collection-slug", None)
            token_id = event.get("token-id", None)
            account_address = event.get("account-address", None)
            transaction_type = event.get("transaction-type", "successful")

            return loop.run_until_complete(self.get_nft_events(contract_address, collection_slug, token_id, account_address, transaction_type))

        else:
            contract_addresses = event.get("contract-addresses", None)
            token_ids = event.get("token-ids", None)
            options = event.get("options", {})

            return loop.run_until_complete(self.get_assets(contract_addresses, token_ids, **options))
    
    async def get_nft_data(self, contract_address: str, token_id: int):
        # Fetch token metadata from OpenSea
        result_opensea = await self.opensea_api.get_asset(contract_address, token_id)
        if result_opensea is APIException:
            return result_opensea

        # Fetch token stats from Blockchair
        result_blockchair = await self.block_chair_api.get_token_stats(contract_address)

        # Join results
        nft_data = {}
        if result_opensea:
            nft_data.update(result_opensea)

        if result_blockchair:
            nft_data.update(result_blockchair)
        
        return nft_data

    def parse_nft_data(self, **data):
        pass

    async def get_asset(self, contract_address: str, token_id: int):

        # Result returned from opensea api
        result = await self.opensea_api.get_asset(contract_address, token_id)
        if isinstance(result, APIException):
            return result

        # Convert to a dict to be able to error hand non existant attributes
        result = dict(result)

        # Get asset contract from result if it exists
        asset_contract = result.get("asset_contract", None)
        if asset_contract is not None:
            result["address"] = asset_contract["address"]

        # Make sure that address and token id match original request
        result["address"] = contract_address
        result["token_id"] = int(token_id)
    
        return {
            "nft": NFT(**result),
            "asset_contract": NFTAssetContract(**asset_contract)
        }

    async def get_assets(self, contract_addresses: list, token_ids: list = None, **options):
        params = {key: val for key, val in options.items() if val is not None}
        params["asset_contract_addresses"] = contract_addresses
        if token_ids is not None:
            params["token_ids"] = token_ids

        # Set query options
        options.setdefault("offset", 0)
        options.setdefault("limit", 50)

        params.update(options)

        result = await self.opensea_api.get_assets(params)
        if isinstance(result, Exception):
            return result

        return self.parse_asset_response(result['assets'])
            
    
    def parse_asset_response(self, data, fields: list = None):
        """
        Parse the asset response data into individual models
        """
        models = []

        # Parse each value if multiple passed in
        if not isinstance(data, list):
            data = [data]
        
        for elt in data:
            elt.pop("id")
            asset_contract = elt.get("asset_contract", None)
            collection = elt.get("collection", None)
            
            if asset_contract is not None:
                elt["address"] = asset_contract["address"]
            if collection is not None:
                asset_contract["slug"] = collection["slug"]
            else:
                asset_contract["slug"] = "UNKNOWN"

            nft_model = NFT(**elt)
            asset_contract = NFTAssetContract(**asset_contract)
            models.append({"nft": nft_model, "asset_contract": asset_contract})
            
        return models

    async def get_nft_collection(self, collection_slug: str):
        result = await self.opensea_api.get_collection(collection_slug)
        if isinstance(result, Exception):
            return result
        return self.parse_nft_collection_response(result["collection"])

    def parse_nft_collection_response(self, data):

        return Collection(**data)

    async def get_nft_collections(self, asset_owner = None, offset = 0, limit = 50):
        params = {}
        if asset_owner:
            params["asset_owner"] = asset_owner
        
        params["offset"] = offset
        params["limit"] = limit
        
        result = await self.opensea_api.get_collections(params)

        if isinstance(result, APIException):
            return result

        return Collection(**result)

    async def get_nft_collection_stats(self, collection_slug: str):
        return await self.opensea_api.get_collection_stats(collection_slug)
    
    #TODO:// Clean this up
    async def get_nft_events(self, contract_address=None, collection_slug=None, token_id=None, account_address=None, transaction_type="successful", **options):
        """
        event_types:
            created
            successful
            bid_entered
            bid_withdrawn
            transfer
            approve
            cancelled
        options:
            only_opensea: bool,
            occured_before: datetime,
            occured_after: datetime,
            auction_type: string,
            offset: int,
            limit: int
        """
        params = {}
        if contract_address is not None:
            params['asset_contract_address'] = contract_address
        
        if collection_slug is not None:
            params['collection_slug'] = collection_slug
        
        if token_id is not None:
            params['token_id'] = token_id
        
        if account_address is not None:
            params['account_address'] = account_address

        params['event_type'] = transaction_type

        options.setdefault('offset', 0)
        options.setdefault('limit', 50)

        for key, val in options.items():
            params[key] = val
        
        return self.parse_nft_events(await self.opensea_api.get_events(params))

    def parse_nft_events(self, nftEvents):
        if isinstance(nftEvents, APIException):
            return nftEvents
        
        if not isinstance(nftEvents, list):
            nftEvents = [nftEvents]

        return [NFTEvent(**nftEvent) for nftEvent in nftEvents]

    async def get_nft_user_events(self, account_address: str, options: EventRequest):
        params = {
            "account_address": account_address
        }

        for key, val in options.dict().items():
            if val is not None:
                params[key] = val

        return await self.opensea_api.get_events(params)
