from datetime import datetime

from typing import Optional

from fastapi import APIRouter
from fastapi import params
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import HTTPException
from fastapi.params import Depends, Header, Query
from fastapi.params import Body

from .request_schemas import AssetsRequest, EventRequest

from ..apis.exceptions import APIException

from ..services.nft_service import NFTService


nft_service = NFTService()

nft_router = APIRouter(prefix="/nft", tags=["NFT"])

"""
-------- Assets --------
"""
@nft_router.get('/assets')
async def get_nft_assets(contract_addresses: list = Query(...), token_ids: Optional[list] = Query(None), options: AssetsRequest = Depends()):
    options: dict = jsonable_encoder(options)
    result = await nft_service.get_assets(contract_addresses, token_ids, **options)
    if isinstance(result, Exception):
        raise HTTPException(status_code=result.status_code, detail=result.reason_phrase)
    return result

@nft_router.get("/{contract_address}/data")
async def get_nft(contract_address: str, token_id: int):
    nft_data = await nft_service.get_nft_data(contract_address, token_id)
    return nft_data

@nft_router.get("/{contract_address}/asset")
async def get_nft_asset(contract_address, token_id):
    result = await nft_service.get_asset(contract_address, token_id)
    if isinstance(result, Exception):
        raise HTTPException(status_code=result.status_code, detail=result.reason_phrase)
    return result

"""
-------- Collections --------
"""
@nft_router.get("/collections")
async def get_nft_collections(asset_owner: Optional[str] = None, offset: Optional[int] = 0, limit: Optional[int] = 50):
    result = await nft_service.get_nft_collections(asset_owner, offset, limit)
    if isinstance(result, Exception):
        raise HTTPException(result.status_code, result.reason_phrase)

    return result

@nft_router.get("/{collection_slug}")
async def get_nft_collection(collection_slug):
    result = await nft_service.get_nft_collection(collection_slug)
    if isinstance(result, APIException):
        return HTTPException(result.status_code, result.reason_phrase)
    return result

@nft_router.get("/{collection_slug}/stats")
async def get_nft_collection_stats(collection_slug: str):
    result = await nft_service.get_nft_collection_stats(collection_slug)
    if isinstance(result, Exception):
        raise HTTPException(result.status_code, result.reason_phrase)
    return result

"""
-------- Events --------
"""
@nft_router.get("/events/{contract_address}")
async def get_nft_events(contract_address: str, options: EventRequest = Depends()):
        options: dict = jsonable_encoder(options)
        options.pop("contract_address")

        return await nft_service.get_nft_events(contract_address, **options)

@nft_router.get("/events/user/{account_address}")
async def fetch_user_events(account_address: str, options: EventRequest = Depends()):
    result = await nft_service.get_nft_user_events(account_address, options)
    if isinstance(result, Exception):
        raise HTTPException(result.status_code, result.reason_phrase)

    return result

