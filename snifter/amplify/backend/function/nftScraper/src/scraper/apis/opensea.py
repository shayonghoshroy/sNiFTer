import httpx

from .base_api import BaseAPI
from .exceptions import APIException

class OpenSeaAPI(BaseAPI):
    def __init__(self) -> None:
        base_url = "https://api.opensea.io/api/v1"

        super().__init__("opensea", base_url)

    async def get_asset(self, contract_address: str, token_id: int):
        endpoint = f"/asset/{contract_address}/{token_id}"
        
        results = await self.make_get_request(endpoint)
        if isinstance(results, APIException):
            return results

        return results.json()

    async def get_assets(self, params):
        endpoint = f"/assets"

        results = await self.make_get_request(endpoint, params)
        if isinstance(results, Exception):
            return results
        
        return results.json()

    async def get_collection(self, collection_slug: str):
        endpoint = f"/collection/{collection_slug}"

        results = await self.make_get_request(endpoint)
        if isinstance(results, APIException):
            return results

        return results.json()

    async def get_collections(self, params):
        endpoint = "/collections"

        result = await self.make_get_request(endpoint, params)
        if isinstance(result, APIException):
            return result

        return result.json()

    async def get_collection_stats(self, collection_slug: str):
        endpoint = f"collection/{collection_slug}/stats"

        result = await self.make_get_request(endpoint)
        if isinstance(result, APIException):
            return result

        return result.json()

    async def get_events(self, params):
        endpoint = "/events"

        result = await self.make_get_request(endpoint, params)
        if isinstance(result, APIException):
            return result

        return result.json()
