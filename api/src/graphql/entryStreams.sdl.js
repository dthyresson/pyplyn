export const schema = gql`
  type EntryStream {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastAccessedAt: DateTime
    streamSource: StreamSource!
    streamType: StreamType!
    name: String!
    description: String
    streamIdentifier: String!
    continuation: String
    entries: [Entry]!
  }

  enum StreamSource {
    FEEDLY
  }
  enum StreamType {
    CATEGORY
    BOARD
    PRIORITY
  }

  type Query {
    entryStreams: [EntryStream!]!
    entryStream(id: String!): EntryStream
  }

  input CreateEntryStreamInput {
    lastAccessedAt: DateTime
    streamSource: StreamSource!
    streamType: StreamType!
    name: String!
    description: String
    streamIdentifier: String!
    continuation: String
  }

  input UpdateEntryStreamInput {
    lastAccessedAt: DateTime
    streamSource: StreamSource
    streamType: StreamType
    name: String
    description: String
    streamIdentifier: String
    continuation: String
  }

  type Mutation {
    createEntryStream(input: CreateEntryStreamInput!): EntryStream!
    updateEntryStream(id: String!, input: UpdateEntryStreamInput!): EntryStream!
    deleteEntryStream(id: String!): EntryStream!
  }
`
