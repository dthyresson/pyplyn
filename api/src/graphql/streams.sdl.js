export const schema = gql`
  input StreamResponse {
    id: String!
    updated: Float!
    continuation: String
    items: [JSON]
  }
`
