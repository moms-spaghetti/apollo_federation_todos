const { ApolloServer, gql } = require("apollo-server");
const todos = require("./todos-data.json");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");
const { allTodos, findTodo } = require("../context/lib");

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
    allTodos: [Todo!]!
    findTodo(id: ID!): [Todo!]
  }
`;

const resolvers = {
  Query: {
    allTodos: (_, __) => allTodos(),
    findTodo: (_, { id }) => findTodo(id),
  },
  User: {
    userTodos: (user) => todos.filter((todo) => todo.userId === user.id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
  context: () => ({
    allTodos,
    findTodo,
  }),
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Todos service started on: ${url}`);
});
