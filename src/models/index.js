// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { user } = initSchema(schema);

export {
  user
};