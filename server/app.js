const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
//load dbmethod
const mongoDataMethod = require("./data/db");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethod }),
  });
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(
      `server is running at http://localhost:4000${server.graphqlPath}`
    );
  });
}

mongoose
  .connect(
    "mongodb+srv://admin:123@bookstore.vjlp7.mongodb.net/bookstore?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

startApolloServer(typeDefs, resolvers);
