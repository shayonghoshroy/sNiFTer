import json
import uuid
import boto3

from pydantic import BaseModel

from scraper.apis.exceptions import APIException
from scraper.services.nft_service import NFTService

# We can run this asynchronously, because it doesn't matter the order that the data is inserted into the dictionary
async def format_item(data: dict):
    item = {}
    for key, val in data.items():
        # Don't insert null values
        if val is None:
            continue

        if isinstance(val, str):
            item[key] = {"S": val}

        if isinstance(val, int) or isinstance(val, float):
            item[key] = {"N": str(val)}

        # If embedded model or dictionary
        if isinstance(val, dict):
            # Recursively insert fields into item
            item[key] = {"M": format_item(dict(val))}
        
        return item

def put_item(data: dict, table_name):
    # Otherwise, save nft model to dynamoDB
    client = boto3.client('dynamodb')
    item = format_item(data)
            
    data = client.put_item(
                TableName=table_name,
                Item=item
            )

def handler(event, context):
    # All events should contain event_type field for function switch
    event_type = event.get("event_type", None)

    # Bad Request
    if event_type is None or not event_type in ["get_asset", "get_assets"]:
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
    if event_type == "get_assets":
        for data in result:
            contract_address, nft = data["asset_contract"], data["nft"]

            put_item(contract_address, "nftAssetContract-l6kkjo2j3jf55dllykn3b64e2u-dev")
            put_item(nft, "nft-l6kkjo2j3jf55dllykn3b64e2u-dev")
    
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