import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type userMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type tweetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class user {
  readonly id: string;
  readonly username: string;
  readonly password_hash: string;
  readonly email: string;
  readonly usertype: string;
  readonly favorites: number[];
  readonly nftWatchlist: number[];
  readonly walletWatchlist: number[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<user, userMetaData>);
  static copyOf(source: user, mutator: (draft: MutableModel<user, userMetaData>) => MutableModel<user, userMetaData> | void): user;
}

export declare class tweet {
  readonly id: string;
  readonly text?: string;
  readonly username?: string;
  readonly reply_count?: number;
  readonly retweet_count?: number;
  readonly like_count?: number;
  readonly interaction_count?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<tweet, tweetMetaData>);
  static copyOf(source: tweet, mutator: (draft: MutableModel<tweet, tweetMetaData>) => MutableModel<tweet, tweetMetaData> | void): tweet;
}