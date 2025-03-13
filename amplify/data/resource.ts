import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { createProfile } from '../function/profile/resource';

const schema = a.schema({
  Trip: a
    .model({
      id: a.id().required(),
      tripName: a.string().required(), 
      destination: a.string().required(), 
      startDate: a.date().required(),
      endDate: a.date().required(),
      tripImageUrl: a.string(),
      tripImageKey: a.string(),
      Activities: a.hasMany('Activity', 'tripID'), 
    })
    .authorization((allow) => [allow.owner()]), 

  Activity: a
    .model({
      id: a.id().required(),
      activityName: a.string().required(), 
      tripID: a.id().required(),
      trip: a.belongsTo('Trip', 'tripID'), 
      activityImageUrl: a.string(),
      activityImageKey: a.string(),
      activityDate: a.date().required(), 
      activityTime: a.time(),
      category: a.ref('ActivityCategory').required(),
    })
    .authorization((allow) => [allow.owner()]) 
    .secondaryIndexes((index) => [
      index('tripID').sortKeys(['activityName']), 
  ]),

  Profile: a.model({
    id: a.id().required(),
    email: a.string().required(),
    firstName: a.string(),
    lastName: a.string(),
    homeCity: a.string(),
    owner: a.string().required(),
  })
  .authorization((allow) => [
    allow.authenticated('userPools'),
    allow.owner().to(['read', 'update', 'create']),
  ]),

  createProfile: a
    .query()
    .arguments({
      name: a.string().required(),
      owner: a.string().required(),
    })
    .returns(a.string())
    .handler(a.handler.function(createProfile))
    .authorization((allow) => [
      allow.authenticated('userPools'),
    ]),

  ActivityCategory: a.enum(['Flight', 'Lodging', 'Meeting', 'Restaurant']),
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', 
  },
});