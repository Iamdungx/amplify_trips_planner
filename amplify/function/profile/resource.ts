import { defineFunction } from '@aws-amplify/backend';

export const createProfile = defineFunction({
  name: 'create-profile',
  entry: './handler.ts',
});