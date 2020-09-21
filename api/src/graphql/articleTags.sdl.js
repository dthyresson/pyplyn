export const schema = gql`
  type ArticleTag {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    article: Article
    articleId: String
    label: String!
    uri: String!
    count: Int!
    score: Float!
    rdfTypes: [String]!
    sentiment: Float!
  }

  type Query {
    articleTags: [ArticleTag!]!
  }

  input CreateArticleTagInput {
    articleId: String
    label: String!
    uri: String!
    count: Int!
    score: Float!
    rdfTypes: [String]!
    sentiment: Float!
  }

  input UpdateArticleTagInput {
    articleId: String
    label: String
    uri: String
    count: Int
    score: Float
    rdfTypes: [String]!
    sentiment: Float
  }
`
