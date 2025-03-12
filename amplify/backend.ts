import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
// thêm storage vào project
import { storage } from './storage/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  storage, // Thêm storage
});
