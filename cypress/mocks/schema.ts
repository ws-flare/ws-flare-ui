import {PubSub} from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const resolvers = {
  Subscription: {
    // App functions
    directoryUpdated: {
      subscribe: () => pubsub.asyncIterator('updateDirectory')
    },
    fileUpdated: {
      subscribe: () => pubsub.asyncIterator('updatedFile')
    },
    tailTaskLog: {
      subscribe: () => pubsub.asyncIterator('tailTaskLog')
    }
  },
  Mutation: {
    // Test function
    e2eDirectoryUpdated: async (_: any, {directory}: any) => {
      await pubsub.publish('updateDirectory', {directoryUpdated: directory});
      return true;
    },

    e2eFileUpdated: async (_: any, {sessionId, path, file}: any) => {
      await pubsub.publish('updatedFile', {fileUpdated: {sessionId, path, file}});
      return true;
    },

    e2eTailTaskLogUpdated: async (_: any, {log}: any) => {
      await pubsub.publish('tailTaskLog', {tailTaskLog: log});
      return true;
    }
  }
};
