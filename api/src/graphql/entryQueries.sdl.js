export const schema = gql`
  type Query {
    entryById(id: String!): Entry
    entryByDocumentId(documentId: String!): Entry
    entryByUid(uid: String!): Entry
  }
`
