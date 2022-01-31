import json
import boto3

def handler(event, context):
  print('received event:')
  print(event)

  # create a user model
  username = event['userName']

  # initialize boto client
  client = boto3.client('dynamodb')
  
  # create new user model
  data = client.put_item(
    TableName='user-ic7gmhldrbcyjaekjqst7cutma-shayondev',
    Item={
        'id': {
            'S': username
        },
        'username': {
            'S': username
        }
    } 
  )
  
  return event