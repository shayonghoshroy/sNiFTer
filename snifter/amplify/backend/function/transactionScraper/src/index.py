import json
import asyncio

from transaction_event import TransactionEvent
from opensea import get_event
from APIException import APIException
from nft_event_service import maybe_put_batch_items

def handler(event, context):
  event = event['Records'][0]
  
  # Body from SQS should be JSON string
  # Supporting one record (sqs message) for now for simplicity
  transaction_event = json.loads(event['body'])
  message_id = event["messageId"]
  
  # Create TransactionEvent object
  try:
    transaction_event = TransactionEvent(**transaction_event)
  
  # Bad request
  except Exception:
    print('Bad Request')
    return {
      'statusCode': 400,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps({'reason': 'Malformed transaction event body'})
    }
    
  data = get_event(transaction_event)
  
  # Error returned from OpenSea API
  if isinstance(data, APIException):
    print('API Exception', data.status_code)
    return {
      'statusCode': data.status_code,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps({'reason': data.reason_phrase})
    }
    
  loop = asyncio.get_event_loop()
  loop.run_until_complete(maybe_put_batch_items(data, message_id))
  
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps({"message_id": message_id})
  }
