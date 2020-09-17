export const schema = gql`
  type Article {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publishedAt: DateTime!
    entry: Entry!
    entryId: String!
    author: String!
    title: String!
    url: String!
  }

  type Query {
    article(id: String!): Article
    articleByEntryId(entryId: String!): Article
    articleByDocumentId(documentId: String!): Article
    articles: [Article!]!
  }

  input CreateArticleInput {
    publishedAt: DateTime!
    entryId: String!
    author: String!
    title: String!
    url: String!
  }

  input UpdateArticleInput {
    publishedAt: DateTime
    entryId: String
    author: String
    title: String
    url: String
  }
`
