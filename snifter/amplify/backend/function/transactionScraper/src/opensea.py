import requests

from transaction_event import TransactionEvent

from APIException import APIException

super_secret_api_key = "121e8a8126664ef8ab27769de9fc6549"

def get_event(transaction_event: TransactionEvent):
    transaction_event = dict(transaction_event)
    
    # Parse non-null values into request params
    params = '&'.join([f"{key}={val}" for key, val in transaction_event.items() if val is not None])
    endpoint = "https://api.opensea.io/api/v1/events"
    if params != '':
        endpoint += f"?{params}"
            
    resp = requests.get(endpoint, headers = {'x-api-key': super_secret_api_key})
    if resp.status_code != 200:
        return APIException("opensea", "/events", resp.status_code, resp.reason)
    
    return resp.json()['asset_events']
