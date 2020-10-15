export const schema = gql`
  type ArticleCategory {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    article: Article!
    articleId: String!
    uid: String!
    label: String!
  }

  type Query {
    articleCategories: [ArticleCategory!]!
  }

  input CreateArticleCategoryInput {
    articleId: String!
    uid: String!
    label: String!
  }

  input UpdateArticleCategoryInput {
    articleId: String
    uid: String
    label: String
  }
`
