export const schema = gql`
  type Query {
    article(id: String!): Article
    articleByEntryId(entryId: String!): Article
    articleByDocumentId(documentId: String!): Article
  }
`
