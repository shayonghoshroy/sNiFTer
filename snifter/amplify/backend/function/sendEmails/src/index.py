import json
import boto3

def handler(event, context):
  print('received event:')
  print(event)

  send_html_email()
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }

def send_html_email():
    ses_client = boto3.client("ses", region_name="us-east-2")
    CHARSET = "UTF-8"
    HTML_EMAIL_CONTENT = """
        <html>
            <head></head>
            <h1 style='text-align:left'>Get Ready</h1>
            <p style='text-align:left'>A collection from Bored Ape is dropping at 02-10-2022 14:00:00</p>
            </body>
        </html>
    """

    response = ses_client.send_email(
        Destination={
            "ToAddresses": [
                "mdpinto22@gmail.com",
                "sghoshroy21@gmail.com"
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
