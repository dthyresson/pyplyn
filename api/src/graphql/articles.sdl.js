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
    tagLabels: [String]!
    url: String!
    articleContext: ArticleContext
    tags: [Tag]!
    tweets: [Tweet]!
  }

  type Query {
    articles: [Article!]!
    article(id: String!): Article
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
    tagLabels: [String]!
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
    tagLabels: [String]!
    url: String
  }

  type Mutation {
    createArticle(input: CreateArticleInput!): Article!
    updateArticle(id: String!, input: UpdateArticleInput!): Article!
    deleteArticle(id: String!): Article!
  }
`
