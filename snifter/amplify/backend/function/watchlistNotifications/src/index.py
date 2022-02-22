import json
import boto3

def handler(event, context):
    print('received event:')
    print(event)

    # initialize boto client, set table names
    client = boto3.client('dynamodb')
    watchlist_table='UserWatchlistNft-ic7gmhldrbcyjaekjqst7cutma-shayondev'
    user_table = 'user-ic7gmhldrbcyjaekjqst7cutma-shayondev'
    
    # email client
    ses_client = boto3.client("ses", region_name="us-east-2")
    CHARSET = "UTF-8"

    for item in scan_table(client, watchlist_table):
        ID = item["id"]['S']
        userID = item["userID"]['S']
        nftID = item["nftID"]['S']
        email = get_email(client, userID, user_table)
        # if transaction object exists, check for update
        # else create new transaction attribute
        transaction = get_transaction(nftID)
        if "transaction" in item:
            print('yes transaction')
            print(item['transaction']['S'], transaction)
            if item['transaction']['S'] != transaction:
                set_transaction(client, watchlist_table, ID, userID, nftID, transaction)
                send_email(ses_client, CHARSET, userID, nftID, transaction, email)
                
        else:
            print('no transaction')
            set_transaction(client, watchlist_table, ID, userID, nftID, transaction)
            send_email(ses_client, CHARSET, userID, nftID, transaction, email)
            
        #send_email(ses_client, CHARSET, userID, nftID, email)
        print(userID, nftID, email, transaction)
        
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
def scan_table(client, watchlist_table):
    paginator = client.get_paginator("scan")
    for page in paginator.paginate(TableName=watchlist_table):
        yield from page["Items"]
        
# given a user id, return their email
def get_email(client, userID, user_table):
    response = client.get_item(
        TableName=user_table,
        Key={
            'id': {'S': userID}
        }
    )
    return response['Item']['email']['S']
    
# send a notification email
def send_email(ses_client, CHARSET, userID, nftID, transaction, email):
    HTML_EMAIL_CONTENT = """
        <html>
            <head></head>
            <h1 style='text-align:left'>"""+userID+""", a new transaction just occured for an NFT on your watchlist.</h1>
            <p style='text-align:left'>NFT ID: """+nftID+"""</p>
            <p style='text-align:left'>Transaction: """+transaction+"""</p>
            </body>
        </html>
    """

    response = ses_client.send_email(
        Destination={
            "ToAddresses": [
                email
            ],
        },
        Message={
            "Body": {
                "Html": {
                    "Charset": CHARSET,
                    "Data": HTML_EMAIL_CONTENT,
                }
            },
            "Subject": {
                "Charset": CHARSET,
                "Data": "Alert from your watchlist",
            },
        },
        Source="sghoshroy21@gmail.com",
    )

# update table item to include a transaction
def set_transaction(client, watchlist_table, ID, userID, nftID, transaction):
    data = client.put_item(
    TableName=watchlist_table,
    Item={
        'id': {
            'S': ID
        },
        'userID': {
            'S': userID
        },
        'nftID': {
            'S': nftID  
        },
        'transaction': {
            'S': get_transaction(nftID)
        }
    } 
  )
  
# get latest nft transaction
def get_transaction(nftID):
    return "my mom"
    
    
    
