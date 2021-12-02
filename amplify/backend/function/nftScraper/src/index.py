import json

from src.services.nft_service import NFTService

def handler(event, context):
  event = dict(event)
  event_type = event.pop("event_type")

  nft_service = NFTService()
  result = nft_service.function_switch(event_type, event)
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dump(result)
  }