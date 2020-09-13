export const schema = gql`
  type Entry {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    document: JSON!
  }

  type Query {
    entries: [Entry!]!
  }

  input CreateEntryInput {
    document: JSON!
  }

  input UpdateEntryInput {
    document: JSON
  }
`
