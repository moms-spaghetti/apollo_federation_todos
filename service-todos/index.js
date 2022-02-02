const { ApolloServer, gql } = require("apollo-server");
const todos = require("./todos.json");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");

const typeDefs = gql`
  type Todo {
    userId: ID!
    id: ID!
    title: String!
    completed: Boolean!
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    userTodos: [Todo!]!
  }

  type Query {
    allTodos(id: ID): [Todo!]!
  }
`;

const resolvers = {
  Query: {
    allTodos: (root, { id }) =>
      !id ? todos : todos.filter((todo) => todo.id === id),
  },
  User: {
    userTodos: (user) => todos.filter((todo) => todo.userId === user.id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Todos service started on: ${url}`);
});
