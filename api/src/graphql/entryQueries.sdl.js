export const schema = gql`
  type Query {
    entry(id: String!): Entry
    entryByDocumentId(documentId: String!): Entry
    entryByUid(uid: String!): Entry
  }
`
