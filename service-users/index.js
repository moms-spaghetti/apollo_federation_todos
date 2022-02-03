const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");
const { allUsers, findUser } = require("./lib");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
    user(id: ID!): User!
  }
`;

const resolvers = {
  Query: {
    allUsers: (_, __, { allUsers }) => allUsers(),
    user: (_, { id }, { findUser }) => findUser(id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
  context: (_) => ({
    allUsers,
    findUser,
  }),
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Users service started on: ${url}`);
});
