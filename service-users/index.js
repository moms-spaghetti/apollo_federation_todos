const { ApolloServer, gql } = require("apollo-server");
const users = require("./users.json");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers(id: ID): [User!]!
    user(id: ID!): User!
  }
`;

const resolvers = {
  Query: {
    allUsers: (root, { id }) =>
      !id ? users : users.filter((user) => user.id === id),
    user: (root, { id }) => users.find((user) => user.id === id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Users service started on: ${url}`);
});
