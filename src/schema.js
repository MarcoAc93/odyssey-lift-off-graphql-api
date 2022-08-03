const { gql } = require('apollo-server');

const typeDefs = gql`
  "Author of a complete track"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture url"
    photo: String
  }

"A Module is a single unit of teaching. Multiple Modules compose a Track"
  type Module {
    id: ID!
    "The Module's title"
    title: String!
    "The Module's length in seconds"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The track's id that it belongs"
    trackId: String!
    "The module's video duration in seconds"
    durationInSeconds: Int!
    "The author's id that created this module"
    authorId: String!
    "What is it about"
    topic: String!
    "The content of the module"
    content: String!
    "The video of the module"
    videoUrl: String!
  }
 
  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "the track's title"
    title: String!
    "the track's main author"
    author: Author!
    "The track's main illustration to display in track card or track page detail"
    thumbnail: String
    "the track's approximate length to complete, in seconds"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The module's video duration in seconds"
    durationInSeconds: Int!
    "the number of modules this track contains"
    modulesCount: Int
    "The track's complete description, can be in Markdown format"
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    "The track's complete array of Modules"
    modules: [Module!]!
  }

  type Query {
    "Fetch a specific track, provided a track's ID"
    track(id: ID!): Track
    "Query to get tracks array for the homepage grid"
    tracksForHome: [Track!]!
    "Fetch a specific module, provided a module's ID"
    module(moduleId: ID!): Module
  }

  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }

  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  }
`;

module.exports = typeDefs;
