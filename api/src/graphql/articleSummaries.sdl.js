export const schema = gql`
  type ArticleSummary {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    article: Article!
    articleId: String!
    sentenceText: String!
    sentenceScore: Float!
    sentencePosition: Int!
  }

  type Query {
    articleSummaries: [ArticleSummary!]!
  }

  input CreateArticleSummaryInput {
    articleId: String!
    sentenceText: String!
    sentenceScore: Float!
    sentencePosition: Int!
  }

  input UpdateArticleSummaryInput {
    articleId: String
    sentenceText: String
    sentenceScore: Float
    sentencePosition: Int
  }
`
