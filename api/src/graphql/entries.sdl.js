export const schema = gql`
  type Entry {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    uid: String!
    document: JSON!
  }

  type Query {
    entries: [Entry!]!
  }

  input CreateEntryInput {
    uid: String!
    document: JSON!
  }

  input CreateEntriesInput {
    entries: [JSON!]!
  }

  input UpdateEntryInput {
    uid: String
    document: JSON
  }
`
