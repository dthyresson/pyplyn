export const schema = gql`
  type Query {
    entryStreamByName(name: String!): EntryStream
  }
`
