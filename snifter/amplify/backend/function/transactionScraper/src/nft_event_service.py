import boto3
import asyncio

from nft_event import NFTEvent, Transaction


TABLE_MAP = {
    "transaction": "Transaction-u7k5bta6mvfefdvl7fidjvr7ay-stephendev",
    "nft_event": "nftEvent-u7k5bta6mvfefdvl7fidjvr7ay-stephendev"
}

def get_nft_event(nft_event: NFTEvent, dynamodb = None, nft_event_table = None):
    '''
    TODO:// Generalize this for eventual Dynamodb lambda layer
    '''
    if dynamodb is None and nft_event_table is None:
        dynamodb = boto3.resource('dynamodb')

    if nft_event_table is None:
        nft_event_table = dynamodb.Table(TABLE_MAP['nft_event'])

    try:
        response = nft_event_table.get_item(
            Key={
                'id': nft_event.id
            }
        )
        
        # Check for returned item and field population
        existing_nft_event = response.get("Item", None)
        if existing_nft_event and existing_nft_event.get('id', False):
            return NFTEvent(**response['Item'])

        return None

    except Exception as e:
        print(e)
        return None

def get_transaction(transaction: Transaction, dynamodb = None, transaction_table = None):
    if dynamodb is None and transaction_table is None:
        dynamodb = boto3.resource('dynamodb')

    if transaction_table is None:
        transaction_table = dynamodb.Table(TABLE_MAP['transaction'])

    try:
        response = transaction_table.get_item(
            Key={
                'id': transaction.id
            }
        )
        
        # Check for returned item and field population
        existing_transaction = response.get("Item", None)
        if existing_transaction and existing_transaction.get('id', False):
            return Transaction(**response['Item'])

        return None

    except Exception as e:
        print(e)
        return None

async def put_batch_nft_events_task(items: list, dynamodb = None, event_table = None, transaction_table = None):
    '''
    TODO:// Generalize this for eventual dynamodb lambda layer
    '''
    if dynamodb is None and (event_table is None or transaction_table is None):
        dynamodb = boto3.resource('dynamodb')

    if event_table is None:
        event_table = dynamodb.Table(TABLE_MAP['nft_event'])

    transactions = []
    with event_table.batch_writer() as batch:
        for item in items:
            try:
                item = NFTEvent(True, **item)
                test = get_nft_event(item, nft_event_table=event_table)
                if test is None:
                    print(item.id, 'NEW')
                    item = dict(item)
                    batch.put_item(
                        Item=item
                    )

                    transaction = item.get('transaction', None)
                    if transaction is not None:
                        transactions.append(Transaction(**transaction))
                    
                else:
                    print(item.id, 'OLD')

            # Don't break loop for one erroneous nft_event
            except Exception as e:
                print(e)
                continue

    # Write transactions in batch as well
    if len(transactions) > 0:
        if transaction_table is None:
            transaction_table = dynamodb.Table(TABLE_MAP['transaction'])
        
        with transaction_table.batch_writer() as batch:
            for transaction in transactions:
                try:
                    item = Transaction(True, **item)
                    result = get_transaction(item, transaction_table=transaction_table)
                    if result is None:
                        print(item.id, 'NEW')
                        item = dict(item)
                        batch.put_item(
                            Item=item
                        )
                        
                    else:
                        print(item.id, 'OLD')

                # Don't break loop for one erroneous nft_event
                except Exception as e:
                    print(e)
                    continue


async def maybe_put_batch_items(items: list):
    '''
    Asynchronously put items in batch. NFTEvents may be a list with hundreds of items.
    We can see increased write times by parallelizing.
    '''
    dynamodb = boto3.resource('dynamodb')
    nft_event_table = dynamodb.Table(TABLE_MAP['nft_event'])

    if not isinstance(items, list):
        items = [items]

    # Create coroutine tasks
    tasks = []
    batch_length = len(items)
    for i in range(0, batch_length, 50):
        if batch_length - i >= 50:
            tasks.append(put_batch_nft_events_task(items[i: i + 50], table=nft_event_table))
        else:
            tasks.append(put_batch_nft_events_task(items[i:], table=nft_event_table))
    
    results = await asyncio.gather(*tasks)
