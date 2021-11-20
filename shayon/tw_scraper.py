# Written by: Evan Owre, Nov 9 2021, NFT twitter data scraper
import pandas as pd
from datetime import datetime
print("start")
import snscrape.modules.twitter as sntwitter

#Query by text search
maxTweets = 500
tweet_list = []
for i, tweet in enumerate(sntwitter.TwitterSearchScraper('nft').get_items()):
#^^ loop for search scraping
#for i, tweet in enumerate(sntwitter.TwitterUserScraper('FluffyHeadsNFT').get_items()):
#^^ loop for user scraping
#for i, tweet in enumerate(sntwitter.TwitterHashtagScraper('nft').get_items()):
    if i > maxTweets:
        break
    tweet_list.append([tweet.date, 
        tweet.id,
        tweet.content,
        tweet.user.username,
        tweet.replyCount, 
        tweet.retweetCount, 
        tweet.likeCount,
        tweet.replyCount + tweet.retweetCount + tweet.likeCount])

tweet_df = pd.DataFrame(tweet_list, columns=['Datatime', 
    'Tweet Id',
    'Text',
    'Username',
    'Reply Count',
    'Retweet Count',
    'Like Count',
    'Interaction count'])

print(tweet_df.head())
print(tweet_df.dtypes)

#tweet_df.to_csv('text-query-tweets.csv', sep=',', index = False)