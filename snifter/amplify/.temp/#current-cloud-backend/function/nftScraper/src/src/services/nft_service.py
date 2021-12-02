import enum

import asyncio

from .request_schemas import EventRequest

from ..models.nft import NFT
from ..models.collection import Collection

from ..apis.exceptions import APIException
from ..apis.block_chair import BlockChairAPI
from ..apis.opensea import OpenSeaAPI

class NFTService():
    def __init__(self) -> None:
        self.opensea_api = OpenSeaAPI()
        self.block_chair_api = BlockChairAPI()

    def function_switch(self, event_type: str, event: dict):
        if event_type != "get_asset":
            raise NotImplemented("Only get_asset currently implemented in GraphQL")

        contract_address = event.pop("contract_address")
        token_id = event.pop("token_id")

        loop = asyncio.get_event_loop()
        return loop.run_until_complete(self.get_asset(contract_address, token_id))
    
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

    async def get_asset(self, contract_address: str, token_id: str):
        return await self.opensea_api.get_asset(contract_address, token_id)

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
        if hasattr(data, "__iter__"):
            for elt in data:
                elt.pop("id")
                nft_model = NFT(**elt)
                models.append(nft_model)
        else:
            nft_model = NFT(**data)
            models.append(nft_model)
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

        return await self.opensea_api.get_collections(params)

    async def get_nft_collection_stats(self, collection_slug: str):
        return await self.opensea_api.get_collection_stats(collection_slug)
    
    #TODO:// Clean this up
    async def get_nft_events(self, contract_address, **options):
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
            token_id: int,
            account_address: str,
            collection_slug: str,
            occured_before: datetime,
            occured_after: datetime,
            auction_type: string,
            offset: int,
            limit: int
        """
        params = {key: val for key, val in options.items() if val is not None}
        
        params["asset_contract_address"] = contract_address
        
        return await self.opensea_api.get_events(params)

    async def get_nft_user_events(self, account_address: str, options: EventRequest):
        params = {
            "account_address": account_address
        }

        for key, val in options.dict().items():
            if val is not None:
                params[key] = val

        return await self.opensea_api.get_events(params)
