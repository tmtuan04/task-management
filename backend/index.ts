import express, { Express, Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import { json } from "express";

const typeDefs = `#graphql
  type Query {
    hello: String
    greeting: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    greeting: () => "Hello, Tu Minh Tuan!",
  },
};

async function startServer() {
  dotenv.config();
  const app: Express = express();
  const port = process.env.PORT || 5000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  // Apply middleware
  app.use('/graphql', json(), expressMiddleware(server));

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer();
