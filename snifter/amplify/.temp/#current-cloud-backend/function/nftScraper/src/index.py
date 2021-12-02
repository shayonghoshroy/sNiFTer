import json

import boto3
from snifter.amplify.backend.function.nftScraper.src.src.apis.exceptions import APIException
from snifter.amplify.backend.function.nftScraper.src.src.models.nft import NFT

from .src.services.nft_service import NFTService

def handler(event, context):
    event = dict(event)
    event_type = event.pop("event_type")

    nft_service = NFTService()
    result = dict(nft_service.function_switch(event_type, event))

    if APIException in result.__class__.__mro__:
        return {
            'statusCode': result.status_code,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
        }

    # Cast to NFT
    nft_model = dict(NFT(**result))

    # Save to s3 bucket
    s3_client = boto3.client('dynamodb')
    data = s3_client.put_item(
        TableName='nft-n5hfgyfjifhgloflblqzaw4aje-dev',
        Item=nft_model
    )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }