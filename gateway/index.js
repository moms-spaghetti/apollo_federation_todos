const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

const start = async (_) => {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { url: "http://localhost:5001", name: "service-users" },
        { url: "http://localhost:5002", name: "service-todos" },
      ],
    }),
  });

  const server = new ApolloServer({
    gateway,
  });

  server.listen(process.env.PORT).then(({ url }) => {
    console.log(`Gateway started on: ${url}`);
  });
};

start();
