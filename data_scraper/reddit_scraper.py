# Written by: Evan Owre, Oct 10 2021, NFT subreddit data scraper
import praw
import pandas as pd
import re
from datetime import datetime

def filterTitle(title):
    if re.findall(r'"([^"]*)"', title):
        fTitle = re.findall(r'"([^"]*)"', title)
    else:
        fTitle = title
    return fTitle

reddit = praw.Reddit(client_id='S-u19_jCcewKdfcLlvtdPA', #loading my reddit developed app
        client_secret='xksZlAzt1ZokDU3psGjBUpbG6WAUZQ', 
        user_agent='NFT WebScraping')
posts = [] #list to store mined posts
nft_subreddit = reddit.subreddit('NFT') # selecting the correct subreddit
print(nft_subreddit.description) #printing out the rules for the subreddit
for post in nft_subreddit.hot(limit=1000): #iterating through the top 100 hot posts
    if post.link_flair_text is None:
        posts.append([filterTitle(post.title),           #appending relevant info for each post on the NFT subreddit
            post.score, 
            post.id, 
            post.subreddit, 
            post.url, 
            post.num_comments,  
            datetime.fromtimestamp(post.created),
            post.link_flair_text])
    elif "NFT" in post.link_flair_text: #or post.link_flair_text is None:
        posts.append([filterTitle(post.title),           #appending relevant info for each post on the NFT subreddit
            post.score, 
            post.id, 
            post.subreddit, 
            post.url, 
            post.num_comments,  
            datetime.fromtimestamp(post.created),
            post.link_flair_text])
post = pd.DataFrame(posts, columns=['title', # creating pandas dataframe to store info as a csv file
    'score',
    'id',
    'subreddit',
    'url',
    'num_comments',
    'created',
    'flair'])
#print(post)  # used in development to ensure I was capturing the correct info
#post['title'].str.strip() NOTE not white space in these columns 
post.to_csv('Hot_NFTS.csv',index=False) #creating csv file to store the data
