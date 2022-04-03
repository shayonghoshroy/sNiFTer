import boto3
from datetime import datetime
import tweepy
import os
import json

def scrape_user(api, usernames):
    client = boto3.client('dynamodb')
    for username in usernames:
        try:
            user = api.get_user(id=username)
        except Exception as e:
            continue
        data = client.put_item(
        TableName= 'twitterUser-u7k5bta6mvfefdvl7fidjvr7ay-stephendev',
        Item={
            'id': {
                'S': str(user.id)
            },
            'name': {
                'S': user.name
            },
            'screen_name': {
                'S': user.screen_name
            },
            'location': {
                'S': user.location
            },
            'description': {
                'S': user.description
            },
            'URL': {
                'S': str(user.url)
            },
            'followers': {
                'N': str(user.followers_count)
            },
            'friends_count': {
                'N': str(user.friends_count)
            },
            'listed_count': {
                'N': str(user.listed_count)
            },
            'acct_created_at': {
                'S': str(user.created_at)
            },
            'verified': {
                'BOOL': user.verified
            }
        })
        
def scrape_user_tweets(api, users, numtweet):
    client = boto3.client('dynamodb')
    for user in users:
        try:
            tweets = tweepy.Cursor(api.user_timeline, id=user, tweet_mode='extended').items(numtweet)
        except Exception as e:
            continue
        list_tweets = [tweet for tweet in tweets]
        for tweet in list_tweets:
            print(str(tweet.id) + " " + tweet.user.screen_name)
            put_tweet(tweet, "nft")
                    
def scrape_hashtag(api, words, numtweet):
        client = boto3.client('dynamodb')
        for word in words:
            tweets = tweepy.Cursor(api.search_tweets, word, lang="en", tweet_mode='extended', count = numtweet).items(numtweet)
            list_tweets = [tweet for tweet in tweets]
            for tweet in list_tweets:
                put_tweet(tweet, word)
                
def put_tweet(tweet, word):
    client = boto3.client("dynamodb")
    print(tweet.created_at)
    try:
        text = tweet.retweeted_status.full_text
    except AttributeError:
        text = tweet.full_text
    try:
        like_count = tweet.retweeted_status.favorite_count
    except AttributeError:
        like_count = tweet.favorite_count
    data = client.put_item(
    TableName='tweet-u7k5bta6mvfefdvl7fidjvr7ay-stephendev',
    Item={
        'source': {
            'S': word.lower()
        },
        'id': {
            'S': str(tweet.id)
        },
        'URL': {
            'S': 'https://twitter.com/twitter/statuses/'+ str(tweet._json['id'])
        },
        'text': {
            'S': text
        },
        'username': {
            'S': tweet.user.screen_name
        },
        'followers_count': {
            'N': str(tweet.user.followers_count)
        },
        'retweet_count': {
            'N': str(tweet.retweet_count)
        },
        'following_count': {
            'N': str(tweet.user.friends_count)
        },
        'interaction_count': {
            'N': str(tweet.retweet_count*2 + like_count)
        },
        'date': {
            'N': str(datetime.timestamp(tweet.created_at))
        },
        'favorite_count': {
            'N': str(like_count)
        }
    })

def auth():
        CONSUMER_KEY = os.environ['TWITTER_CONSUMER_KEY']
        CONSUMER_SECRET = os.environ['TWITTER_SECRET_KEY']
        ACCESS_TOKEN = os.environ.get('TWITTER_ACCESS_TOKEN')
        ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN_SECRET']


        auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        api = tweepy.API(auth)
        return api
        
def handler(event, context):
    #Connnect to twitter API
    api = auth()
    
    #Cloudwatch trigger
    if context.invoked_function_arn == "arn:aws:events:us-east-2:722766780721:rule/EveryHour":
        scrape_hashtag(api, "nft", 50)
    else:
    #All events should contain event_type field of funciton switch
        event_type = event.get("resource", None).replace("/", "")
    
    #Bad Request
    if event_type is None or not event_type in ["tweet", "twitteruser"]:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({
                'Exception': 'Invalid Event Type',
                'Reason': f"{event_type} is not supported"
            }),
            'isBase64Encoded': False
        }
    
    
    #Parse body to a dict
    obj = json.loads(event["body"])
    
    #Parse word out of dict
    word = obj.get("word")
    
    #Parse num of tweets out of obj dict
    if obj.get("numtweet") is not None:
        num = obj.get("numtweet")
    else:
        num = 10
    if event_type == "tweet":
        scrape_hashtag(api, word, num)
    elif event_type == "twitteruser":
        scrape_user(api, word)
        scrape_user_tweets(api, word, num)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': '',
        'isBase64Encoded': False
    }
