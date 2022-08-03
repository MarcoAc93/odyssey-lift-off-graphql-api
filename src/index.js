const { ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const TrackAPI = require('./datasources/track-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    const trackAPI = new TrackAPI();
    return { trackAPI };
  },
});

const startApolloServer = async () => {
  const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`
  🚀  Server is running!
  🔉  Listening on port ${port}
  📭  Query at ${url}
  `);
};

startApolloServer();
