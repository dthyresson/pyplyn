export const schema = gql`
  enum DocumentType {
    ARTICLE
    TWEET
  }

  type Entry {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    uid: String!
    document: JSON!
    documentType: DocumentType!
  }

  type Query {
    entries: [Entry!]!
  }

  input CreateEntryInput {
    uid: String!
    document: JSON!
    documentType: String
  }

  input CreateEntriesInput {
    entries: [JSON!]!
  }

  input UpdateEntryInput {
    uid: String
    document: JSON
    documentType: String
  }
`
