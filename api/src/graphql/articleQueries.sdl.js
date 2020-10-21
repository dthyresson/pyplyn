export const schema = gql`
  type ArticlesSet {
    articles: [Article!]!
    pagination: Pagination!
  }

  type Query {
    article(id: String!): Article
    articleById(id: String!): Article
    articleByEntryId(entryId: String!): Article
    articleByDocumentId(documentId: String!): Article
    articlesForLabel(label: String!): [Article]
    paginateArticles(page: Int, limit: Int): ArticlesSet
    refreshArticle(id: String!): Article!
  }
`
