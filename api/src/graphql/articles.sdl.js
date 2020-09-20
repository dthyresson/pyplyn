export const schema = gql`
  type Article {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publishedAt: DateTime!
    entry: Entry!
    entryId: String!
    author: String!
    siteName: String
    title: String!
    description: String
    articleText: String
    language: String
    sentiment: Float!
    tags: [String]!
    url: String!
    articleContext: ArticleContext
  }

  type Query {
    articles: [Article!]!
  }

  input CreateArticleInput {
    publishedAt: DateTime!
    entryId: String!
    author: String!
    siteName: String
    title: String!
    description: String
    articleText: String
    language: String
    sentiment: Float!
    tags: [String]!
    url: String!
  }

  input UpdateArticleInput {
    publishedAt: DateTime
    entryId: String
    author: String
    siteName: String
    title: String
    description: String
    articleText: String
    language: String
    sentiment: Float
    tags: [String]!
    url: String
  }
`
