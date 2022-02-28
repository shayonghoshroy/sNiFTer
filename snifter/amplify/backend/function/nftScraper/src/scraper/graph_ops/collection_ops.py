from boto3.dynamodb.conditions import Key

# DynamoDB should be passed in from boto3 resource
def query_collection(slug: str, dynamodb):
   table = dynamodb.Table('Collection')
   response = table.query(
       KeyConditionExpression=Key('slug').eq(slug)
   )
   return response.get('items', None)
