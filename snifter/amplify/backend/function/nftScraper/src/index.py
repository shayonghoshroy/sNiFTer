import json
import uuid
import asyncio

from scraper.models.collection import Collection

import boto3

from pydantic import BaseModel

from scraper.apis.exceptions import APIException
from scraper.services.nft_service import NFTService

TABLE_MAP = {
    "collection": "collection-l6kkjo2j3jf55dllykn3b64e2u-dev",
    "contract": "nftAssetContract-l6kkjo2j3jf55dllykn3b64e2u-dev",
    "nft": "nft-l6kkjo2j3jf55dllykn3b64e2u-dev"
}

def format_item(data: dict):
    item = {}
    
    for key, val in data.items():
                
        # Don't insert null values
        if val is None:
            continue

        if isinstance(val, str):
            item[key] = {"S": val}
            
        elif isinstance(val, bool):
            item[key] = {"BOOL": val}

        elif isinstance(val, int) or isinstance(val, float):
            item[key] = {"N": str(val)}

        elif isinstance(val, list):
            if isinstance(val[0], str):
                item[key] = {"SS": [string for string in val]}

            elif isinstance(val[0], int) or isinstance(val[0], float):
                item[key] = {"NS": [num for num in val]}
            
            # If dictionary or model, recursively add to list
            else:
                item[key] = {"L": [{"M": format_item(dict(obj)) for obj in val}]}

        # If embedded model or dictionary
        elif isinstance(val, dict) or BaseModel in val.__class__.mro():
            # Recursively insert fields into item
            item[key] = {"M": format_item(dict(val))}
            
    return item

def put_item(data: dict, table_name):
    data = dict(data)
    import pprint
    pprint.pprint(data)
    client = boto3.client('dynamodb')
    item = format_item(data)
    
    data = client.put_item(
                TableName=table_name,
                Item=item
            )

def put_collection(collection: Collection):
    collection = dict(collection)

    # Remove asset contract from collection
    collection.setdefault('primary_asset_contracts', None)
    primary_asset_contracts = collection.pop('primary_asset_contracts')

    # Create collection object
    collection = dict(collection)
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Collection')
    put_item(collection, TABLE_MAP["collection"])

    # Create Asset Contracts
    if primary_asset_contracts is not None:
        for contract in primary_asset_contracts:
            contract = dict(contract)
            contract['collection'] = collection
            # Ensure that the contract slug is set
            contract.setdefault('slug', collection['slug'])
            put_item(contract, TABLE_MAP['contract'])

def handler(event, context):
    # All events should contain event_type field for function switch
    event_type = event.get("resource", None).replace("/", "")

    # Bad Request
    if event_type is None or not event_type in ["nft", "contract", "collection"]:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
        }

    # Perform event
    nft_service = NFTService()
    event = event["body"]
    result = nft_service.function_switch(event_type, event)

    # If error resulting from external API
    if isinstance(result, APIException):
        # Return the code that was received from API
        return {
            'statusCode': result.status_code,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
        }

    # Iteratively insert into table for batch assets
    if event_type == "contract":
        for data in result:
            contract_address, nft = data["asset_contract"], data["nft"]

            put_item(contract_address, "nftAssetContract-l6kkjo2j3jf55dllykn3b64e2u-dev")
            put_item(nft, "nft-l6kkjo2j3jf55dllykn3b64e2u-dev")
            
    elif event_type == "collection":
        put_collection(result)
    
    else:
        contract_address, nft = result["asset_contract"], result["nft"]
        put_item(contract_address, "nftAssetContract-l6kkjo2j3jf55dllykn3b64e2u-dev")
        put_item(nft, "nft-l6kkjo2j3jf55dllykn3b64e2u-dev")

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }