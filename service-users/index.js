const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");
const { allUsers, findUser, totalUsers } = require("./lib");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
    findUser(id: ID!): User!
    totalUsers: Int!
  }
`;

const resolvers = {
  Query: {
    allUsers: (_, __, { allUsers }) => allUsers(),
    findUser: (_, { id }, { findUser }) => findUser(id),
    totalUsers: (_, __) => totalUsers(),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
  context: (_) => ({
    allUsers,
    findUser,
    totalUsers,
  }),
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Users service started on: ${url}`);
});
