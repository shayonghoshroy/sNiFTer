import boto3
from datetime import datetime
import snscrape.modules.twitter as sntwitter


def tw_scraper():
    client = boto3.client('dynamodb')

    #Query by text search
    maxTweets = 500
    for i, tweet in enumerate(sntwitter.TwitterSearchScraper('nft').get_items()):
    #^^ loop for search scraping
    #for i, tweet in enumerate(sntwitter.TwitterUserScraper('FluffyHeadsNFT').get_items()):
    #^^ loop for user scraping
    #for i, tweet in enumerate(sntwitter.TwitterHashtagScraper('nft').get_items()):
        if i > maxTweets:
            break
        '''
        tweet_list.append([tweet.date, 
            tweet.id,
            tweet.content,
            tweet.user.username,
            tweet.replyCount, 
            tweet.retweetCount, 
            tweet.likeCount,
            tweet.replyCount + tweet.retweetCount + tweet.likeCount])
        '''
        data = client.put_item(
        TableName='tweet-nym7x5baijbtza2crmjtn6bo2q-dev',
        Item={
            'id': {
                'S': str(tweet.id)
            },
            'text': {
                'S': tweet.content
            },
            'username': {
                'S': tweet.user.username
            },
            'reply_count': {
                'N': str(tweet.replyCount)
            },
            'retweet_count': {
                'N': str(tweet.retweetCount)
            },
            'like_count': {
                'N': str(tweet.likeCount)
            },
            'interaction_count': {
                'N': str(tweet.replyCount + tweet.retweetCount + tweet.likeCount)
            },
        } 
    )
    
    

def handler(event, context):
  tw_scraper()

  response = {
      'statusCode': 200,
      'body': 'successfully created item!',
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  }
  
  return response
