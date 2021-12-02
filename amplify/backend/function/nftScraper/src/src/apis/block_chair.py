import httpx

from .exceptions import APIException

from .base_api import BaseAPI

from ..models.eth_stats import EthStats


class BlockChairAPI(BaseAPI):
    def __init__(self) -> None:
        # TODO:// Secure this in production
        authentication_key = "G___fugCRxWaoY5t04thDGYKndytAnjJ"
        base_url = "https://api.blockchair.com"

        super().__init__("blockchair", base_url, authentication_key)

    async def get_token_stats(self, contract_address: str, limit = 50):
        """
        Get detailed blockchair stats for ERC20 or ERC721 contracts
        """
        endpoint = f"/ethereum/dashboards/address/{contract_address}"

        params = {
            "key": self.authentication_key,
            "limit": limit,
            'erc_20': 'precise',
            'erc_721': 'true',
            'assets_in_usd': 'true',
            'contract_details': 'true',
            'transactions_instead_of_calls': 'true'
        }

        result = await self.make_get_request(endpoint, params)
        if isinstance(result, APIException):
            return result

        return result.json()

    # TODO
    async def get_erc20_contract_stats(self, contract_address: str, limit: int = 50):
        endpoint = f"/ethereum/erc-20/{contract_address}/stats"

    async def get_eth_stats(self) -> EthStats:
        endpoint = "/ethereum/stats"
        
        result = await self.make_get_request(endpoint)
        if isinstance(result, APIException):
            return result

        return result.json()
