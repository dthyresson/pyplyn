export const schema = gql`
  type ArticlePriorityTerm {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    articlePriority: ArticlePriority
    articlePriorityId: String
    uid: String!
    label: String!
  }

  type Query {
    articlePriorityTerms: [ArticlePriorityTerm!]!
  }

  input CreateArticlePriorityTermInput {
    articlePriorityId: String
    uid: String!
    label: String!
  }

  input UpdateArticlePriorityTermInput {
    articlePriorityId: String
    uid: String
    label: String
  }
`
