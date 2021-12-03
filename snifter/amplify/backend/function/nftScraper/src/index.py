import json

import uuid

import boto3

from scraper.apis.exceptions import APIException
from scraper.services.nft_service import NFTService

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
    nft = dict(result)
    print(nft)

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

    # Otherwise, save nft model to dynamoDB
    client = boto3.client('dynamodb')
    table_name = "nft-l6kkjo2j3jf55dllykn3b64e2u-dev"

    # Iteratively insert into table for batch assets
    if event_type == "get_assets":
        for nft in result:
            data = client.put_item(
                TableName=table_name,
                Item=nft
            )
    
    else:
        table_item = {
            'id': {
                'S': uuid.uuid4()
            },
            'token_id': {
                'N': str(nft["token_id"])
            },
            'num_sales': {
                'N': str(nft["num_sales"])
            }
        }

        data = client.put_item(
            TableName=table_name,
            Item=table_item
        )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        
    }