const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "service-users", url: "http://localhost:5001" },
      { name: "service-todos", url: "http://localhost:5002" },
    ],
  }),
});

const start = async (_) => {
  const server = new ApolloServer({
    gateway,
  });

  server.listen(process.env.PORT).then(({ url }) => {
    console.log(`Gateway started on: ${url}`);
  });
};

start();
