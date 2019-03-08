import {SubscriptionServer} from 'subscriptions-transport-ws';
import {createServer} from 'http';
import * as express from 'express';
import {execute, GraphQLSchema, subscribe} from 'graphql';
import {typeDefs} from './types';
import {resolvers} from './schema';
import {makeExecutableSchema} from 'graphql-tools';

const port = 3001;

export async function startGraphqlServer(): Promise<any> {
  return new Promise(async (resolve) => {
    const expressServer = express();
    const wsServer = createServer(expressServer);

    await new Promise((res) => {
      wsServer.listen(9000, () => {
        const server = new SubscriptionServer({
          execute,
          subscribe,
          schema: makeExecutableSchema({typeDefs, resolvers})
        }, {
          port,
          server: wsServer,
          path: '/subscriptions',
        });

        res(server);
      });
    });

    resolve();

  });
}

startGraphqlServer().then(() => {
  console.log(`Graphql server started on port ${port}`);
});
