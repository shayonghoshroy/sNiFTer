import boto3
from datetime import datetime
import snscrape.modules.twitter as sntwitter

import pandas

def tw_scraper():
    # initialize boto client
    client = boto3.client('dynamodb')
    
    maxTweetsPerCreator = 10
    tweet_list = []
    
    # recommended twiter users
    creators = ["beaniemaxi",
                "andy8052",
                "garyvee",
                "DezBryant",
                "PackripEwing",
                "ABigThingBadly",
                "topshotfund",
                "Zeneca_33",
                "moneymacc",
                "dingalingts",
                "economist",
                "KeithGrossman",
                "long",
                "farokh",
                "BrantlyMillegan",
                "ChrisUniverseB",
                "DrDicatrio",
                "DanVerno",
                "shockermandan",
                "Accumul80r",
                "holderofbags",
                "Ape6056",
                "BoredElonMusk",
                "NFTbark",
                "KingBlackBored",
                "YatMuseum",
                "JLukevich",
                "NBATopShotEast",
                "CapetainTrippy",
                "chriswahl73",
                "0xBender",
                "CryptoPapi10",
                "LeBoredJames",
                "jenkinsthevalet",
                "tropoFarmer",
                "beijingdou",
                "SpottieWiFi",
                "chickaNFT",
                "iamboredbecky",
                "TheShamdoo",
                "anloremi",
                "Velcrafting",
                "RealNatashaChe"
    ]
    
    # for each creator, get their latest tweets up to maxTweetsPerCreator
    for creator in creators:
        for i, tweet in enumerate(sntwitter.TwitterSearchScraper('from:'+creator).get_items()):
            if i > maxTweetsPerCreator:
                break
    
            data = client.put_item(
            TableName='tweet-l6kkjo2j3jf55dllykn3b64e2u-dev',
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
                'date': {
                    'S': str(tweet.date)
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
