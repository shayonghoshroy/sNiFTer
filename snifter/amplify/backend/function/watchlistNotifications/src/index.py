'''
Iterate thru all user-nft watchlist relationships, check for new transactions, and email each user accordingly
'''
import json
import boto3

def handler(event, context):
    print('received event:')
    print(event)

    # initialize boto3 clients
    client = boto3.client('dynamodb')
    ses_client = boto3.client("ses", region_name="us-east-2") # email
    CHARSET = "UTF-8" # email setting

    # set table names
    watchlist_table='UserWatchlistNft-l6kkjo2j3jf55dllykn3b64e2u-dev'
    user_table = 'user-l6kkjo2j3jf55dllykn3b64e2u-dev'
    
    # iterate thru all items in the UserWatchlist table
    for item in scan_table(client, watchlist_table):
        ID = item['id']['S']
        userID = item['userID']['S']
        nftID = item['nftID']['S']
        email = get_email(client, userID, user_table) # get the user's email

        # if a transaction attribute for the user model already exists, check for new update
        transaction = get_transaction(nftID) # get latest transaction
        if 'transaction' in item:
            print('yes transaction')
            print(item['transaction']['S'], transaction)
            # if the latest transaction is different that the previous one, set it and email user
            if item['transaction']['S'] != transaction:
                set_transaction(client, watchlist_table, ID, userID, nftID, transaction)
                send_email(ses_client, CHARSET, userID, nftID, transaction, email)

        # else create new transaction attribute        
        else:
            print('no transaction')
            # set transaction attribute to latest update, email user
            set_transaction(client, watchlist_table, ID, userID, nftID, transaction)
            send_email(ses_client, CHARSET, userID, nftID, transaction, email)
            
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
    paginator = client.get_paginator('scan')
    for page in paginator.paginate(TableName=watchlist_table):
        yield from page['Items']
        
# given a user id, return their email address that's stored in the user table
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
            <h1 style='text-align:left'>"""+userID+""", a new transaction just occurred for an NFT on your watchlist.</h1>
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

# update a user-watchlist table item to include a transaction attribute and set it to be the latest transaction
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
  
# TODO: get the latest nft transaction
def get_transaction(nftID):
    return "your mom"