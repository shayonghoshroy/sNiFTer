import json
import boto3

def handler(event, context):
    print('received event:')
    print(event)

    # initialize boto client, set table name
    client = boto3.client('dynamodb')
    TableName='UserFavoriteNft-ic7gmhldrbcyjaekjqst7cutma-shayondev'

    for item in scan_table(client, TableName):
        print(item)
    
  
    return {
    'statusCode': 200,
    'headers': {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps('Hello from watchlistNotifications lambda!')
}

# yield all items from the watchlist table one at a time
def scan_table(client, TableName):
    paginator = client.get_paginator("scan")
    for page in paginator.paginate(TableName):
        yield from page["Items"]
