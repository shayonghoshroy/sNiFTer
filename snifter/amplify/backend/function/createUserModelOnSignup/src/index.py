import json
import boto3
from __future__ import print_function

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
        'username': {
                    'S': username
                }
    } 
  )
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('createUserModelOnSignup:' + username)
  }