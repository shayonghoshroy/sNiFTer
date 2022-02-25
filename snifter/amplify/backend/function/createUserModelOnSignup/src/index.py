import json
import boto3

def handler(event, context):
  print('received event:')
  print(event)

  # get user attributes
  username = event['userName']
  email = event['request']['userAttributes']['email']

  # initialize boto client
  client = boto3.client('dynamodb')

  # create new user model
  data = client.put_item(
    TableName='user-l6kkjo2j3jf55dllykn3b64e2u-dev',
    Item={
        'id': {
            'S': username
        },
        'username': {
            'S': username
        },
        'email': {
            'S': email  
        },
    } 
  )
  
  return event