export const schema = gql`
  type Entry {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    uid: String!
    documentType: DocumentType!
    document: JSON!
    tweet: Tweet
    article: Article
    entryStream: EntryStream
    entryStreamId: String
  }

  enum DocumentType {
    ARTICLE
    TWEET
  }

  type Query {
    entries: [Entry!]!
  }

  input CreateEntryInput {
    uid: String!
    documentType: DocumentType!
    document: JSON!
    entryStreamId: String
  }

  input UpdateEntryInput {
    uid: String
    documentType: DocumentType
    document: JSON
    entryStreamId: String
  }
`
