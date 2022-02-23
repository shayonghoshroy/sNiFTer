import boto3

class Item:
    def __init__(self, table_name):
        self.client = None

    def get_item(dynamodb = None):
        if dynamodb is None and dynamodb is None:
            dynamodb = boto3.resource('dynamodb')

        if dynamodb is None:
            dynamodb = dynamodb.Table(TABLE_MAP['nft_event'])

        try:
            response = dynamodb.get_item(
                Key={
                    'id': dynamodb.id
                }
            )
            
            # Check for returned item and field population
            existing_nft_event = response.get("Item", None)
            if existing_nft_event and existing_nft_event.get('id', False):
                return dynamodb(**response['Item'])

            return None

        except Exception as e:
            print(e)
            return None


