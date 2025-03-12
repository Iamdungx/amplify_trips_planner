import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

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

  ActivityCategory: a.enum(['Flight', 'Lodging', 'Meeting', 'Restaurant']),

  // Profile: a.model({
  //   id: a.id().required(),
  //   email: a.string().required(),
  //   firstName: a.string(),
  //   lastName: a.string(),
  //   homeCity: a.string(),
  //   owner: a.string().required(),
  // })
  // .authorization((allow) => [
  //   allow.owner('userPools'),
  //   allow.owner().to(['read', 'update', 'create']),
  // ]) 
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', 
  },
});