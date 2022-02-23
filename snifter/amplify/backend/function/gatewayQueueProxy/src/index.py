import json

import boto3

def handler(event, context):
    print(event)

    sqs = boto3.client('sqs')
    sqs_url = "https://sqs.us-east-2.amazonaws.com/722766780721/transactionQueue"

    body = json.loads(event["body"])

    response = sqs.send_message(
        QueueUrl=sqs_url,
        MessageBody=(
            json.dumps(body)
        )
    )

    status = response["ResponseMetadata"]['HTTPStatusCode']
    message_id = response["MessageId"]
    response = {"statusCode": status, "body": ""}

    if status == 200:
        response["body"] = json.dumps({"messageId": message_id})

    response["headers"] = {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }

    response["isBase64Encoded"] = False
    
    return response