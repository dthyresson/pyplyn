export const schema = gql`
  type ArticlePriority {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    article: Article!
    articleId: String!
    uid: String!
    label: String!
    articlePriorityTerms: [ArticlePriorityTerm]!
  }

  type Query {
    articlePriorities: [ArticlePriority!]!
  }

  input CreateArticlePriorityInput {
    articleId: String!
    uid: String!
    label: String!
  }

  input UpdateArticlePriorityInput {
    articleId: String
    uid: String
    label: String
  }
`
