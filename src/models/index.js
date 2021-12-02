// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { user, tweet } = initSchema(schema);

export {
  user,
  tweet
};