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
`
