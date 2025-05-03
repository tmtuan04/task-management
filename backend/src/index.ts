import express, { Express } from "express";
import { ApolloServer } from "@apollo/server"; // Apollo Server cho GraphQL
import { expressMiddleware } from "@apollo/server/express4"; // // Middleware để tích hợp Apollo với Express 4.x
import dotenv from "dotenv";
import { json } from "express";
import cors from "cors"

import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { authContext } from "./middleware/authContext";

dotenv.config();

async function startServer() {
  const app: Express = express();
  const port = process.env.PORT || 5000;

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // nếu bạn muốn test bằng Apollo Studio hoặc GraphQL Playground
  });
  await server.start();

  app.use(
    "/graphql",
    json(),
    expressMiddleware(server, {
      context: authContext,
    })
  );

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer();