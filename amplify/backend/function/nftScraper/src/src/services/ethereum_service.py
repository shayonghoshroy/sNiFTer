from ..models.eth_stats import EthStats
from ..apis.block_chair import BlockChairAPI

class EthereumService():
    def __init__(self) -> None:
        self.block_chair_api = BlockChairAPI()

    async def fetch_ethereum_stats(self):
        result = await self.block_chair_api.get_eth_stats()
        stats = EthStats(**result)
        return stats

