export const schema = gql`
  type Entry {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    documentId: String!
    document: JSON!
  }

  type Query {
    entries: [Entry!]!
  }

  input CreateEntryInput {
    documentId: String!
    document: JSON!
  }

  input UpdateEntryInput {
    documentId: String
    document: JSON
  }
`
