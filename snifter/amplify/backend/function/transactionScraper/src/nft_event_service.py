import boto3
import asyncio

from nft_event import NFTEvent, Transaction


TABLE_MAP = {
    "transaction": "Transaction-u7k5bta6mvfefdvl7fidjvr7ay-stephendev",
    "nft_event": "nftEvent-u7k5bta6mvfefdvl7fidjvr7ay-stephendev",
    "checkpoint": "nftEventCheckpoint-u7k5bta6mvfefdvl7fidjvr7ay-stephendev"
}

def get_item(item_id, dynamodb = None, table = None, table_name = None):
    # Load resource if not provided
    if dynamodb is None and table is None:
        if table_name is None:
            raise ValueError("Table or table name must be provided")
        dynamodb = boto3.resource('dynamodb')

    # Load table if not provided
    if table is None:
        if table_name is None:
            raise ValueError("Table or table name must be provided")
        table = dynamodb.Table(TABLE_MAP[table_name])
    
    response = table.get_item(
        Key={
            'id': item_id
        }
    )
    
    # Check for returned item and field population
    existing_item = response.get("Item", None)
    if existing_item and existing_item.get('id', False):
        return existing_item

    return None

def put_item(item, dynamodb = None, table = None, table_name = None, verify = False):
    item = dict(item)

    # Load resource if not provided
    if dynamodb is None and table is None:
        if table_name is None:
            raise ValueError("Table or table name must be provided")
        dynamodb = boto3.resource('dynamodb')

    # Load table if not provided
    if table is None:
        if table_name is None:
            raise ValueError("Table or table name must be provided")
        table = dynamodb.Table(TABLE_MAP[table_name])

    if verify:
        item = get_item(item, table = table)
        if item is None:
            return None
    
    try:
        table.put_item(
            Item=item
        )
        return item

    except Exception as e:
        print(e)
        return None

def update_checkpoint(checkpoint_id, table, num_saved_events = None, num_total_events = None, status = None):
    # Here, num_saved_events and num_total_events are treated as the amount to add
    checkpoint = get_item(checkpoint_id, table=table)
    checkpoint = NFTEventCheckpoint.from_dict(checkpoint)
    if num_saved_events is not None:
        checkpoint.saved_events += num_saved_events
    if num_total_events is not None:
        checkpoint.total_events += num_total_events
    if status is not None:
        checkpoint.status = status
    
    put_item(checkpoint, table=table)

    return checkpoint

class NFTEventCheckpoint:
    def __init__(self, message_id, saved_events, total_events, status) -> None:
        self.id = message_id
        self.saved_events = saved_events
        self.total_events = total_events
        self.status = status

    def __iter__(self):
        yield 'id', self.id
        yield 'saved_events', self.saved_events
        yield 'total_events', self.total_events
        yield 'status', self.status
        
    def from_dict(data: dict):
        return NFTEventCheckpoint(data['id'], data['saved_events'], data['total_events'], data["status"])

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
        print("GET EVENT", e)
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
        print("GET TRANSACTION", e)
        return None

async def put_batch_nft_events_task(items: list, checkpoint_id, dynamodb = None, event_table = None, transaction_table = None, checkpoint_table = None):
    '''
    TODO:// Generalize this for eventual dynamodb lambda layer
    '''
    if dynamodb is None and (event_table is None or transaction_table is None):
        dynamodb = boto3.resource('dynamodb')

    if event_table is None:
        event_table = dynamodb.Table(TABLE_MAP['nft_event'])

    if checkpoint_table is None:
        checkpoint_table = dynamodb.Table(TABLE_MAP['checkpoint'])

    transactions = []
    saved_events = 0
    with event_table.batch_writer() as batch_writer:
        for item in items:
            #try:
            nft_event = NFTEvent(True, **item)
            from pprint import pprint
            print(nft_event.total_price)
            event = get_item(nft_event.id, table=event_table)
            # event = get_nft_event(item, nft_event_table=event_table)
            if event is None:
                nft_event = dict(nft_event)
                transaction = nft_event.pop('transaction', None)
                print(nft_event['total_price'])

                batch_writer.put_item(
                    Item=nft_event
                )

                if transaction is not None:
                    transactions.append(Transaction(**dict(transaction)))

            saved_events += 1
                    
            # Don't break loop for one erroneous nft_event
            #except Exception as e:
             #   print("Error Event", nft_event)
              #  print("Error 194", e)
               # continue

    # Write transactions in batch as well
    if len(transactions) > 0:
        if transaction_table is None:
            transaction_table = dynamodb.Table(TABLE_MAP['transaction'])
        
        with transaction_table.batch_writer() as batch:
            for transaction in transactions:
                try:
                    item = dict(Transaction(**item))
                    result = get_transaction(item, transaction_table=transaction_table)
                    if result is None:
                        item = dict(item)
                        batch.put_item(
                            Item=item
                        )

                # Don't break loop for one erroneous nft_event
                except Exception as e:
                    print(" FUUUUUUUUUUCK", e)
                    continue
    
    update_checkpoint(checkpoint_id, checkpoint_table, num_saved_events=saved_events)


async def maybe_put_batch_items(items: list, message_id):
    '''
    Asynchronously put items in batch. NFTEvents may be a list with hundreds of items.
    We can see increased write times by parallelizing.
    '''
    #try:
    dynamodb = boto3.resource('dynamodb')
    nft_event_table = dynamodb.Table(TABLE_MAP['nft_event'])
    transaction_table = dynamodb.Table(TABLE_MAP['transaction'])
    checkpoint_table = dynamodb.Table(TABLE_MAP['checkpoint'])

    checkpoint = NFTEventCheckpoint(message_id, 0, 0, "fetching")

    # Return None if checkpoint exists (possible duplicate queue message)
    existing_checkpoint = get_item(checkpoint.id, table=checkpoint_table)
    #if existing_checkpoint is not None:
    #    return None

    # Create checkpoint
    put_item(checkpoint, table=checkpoint_table)
    import time
    attempts = 0
    saved_checkpoint = None
    while saved_checkpoint is None:
        time.sleep(1.0);
        saved_checkpoint = get_item(checkpoint.id, table=checkpoint_table)
    print("Checkpoint Created")

    if not isinstance(items, list):
        items = [items]

    # Create coroutine tasks
    tasks = []
    batch_length = len(items)
    update_checkpoint(checkpoint.id, checkpoint_table, num_total_events=batch_length, status="writing")
    for i in range(0, batch_length, 50):
        if batch_length - i >= 50:
            tasks.append(put_batch_nft_events_task(items[i: i + 50], checkpoint.id, event_table=nft_event_table, transaction_table=transaction_table, checkpoint_table=checkpoint_table))
        else:
            tasks.append(put_batch_nft_events_task(items[i:], checkpoint.id, event_table=nft_event_table, transaction_table=transaction_table, checkpoint_table=checkpoint_table))
    
    results = await asyncio.gather(*tasks)
    update_checkpoint(checkpoint.id, checkpoint_table, status="success")
    
    #except Exception as e:
     #   print(e)
    #    update_checkpoint(message_id, checkpoint_table, status="failure")


