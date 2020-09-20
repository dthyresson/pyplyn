export const schema = gql`
  type ArticleContext {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    article: Article!
    articleId: String!
    content: JSON!
  }

  type Query {
    articleContexts: [ArticleContext!]!
  }

  input CreateArticleContextInput {
    articleId: String!
    content: JSON!
  }

  input UpdateArticleContextInput {
    articleId: String
    content: JSON
  }
`
