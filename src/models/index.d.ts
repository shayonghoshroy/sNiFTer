import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type userMetaData = {
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