export const schema = gql`
  type TweetTextAnalysis {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tweet: Tweet!
    nlp: JSON!
    tweetId: String!
  }

  type Query {
    tweetTextAnalyses: [TweetTextAnalysis!]!
  }

  input CreateTweetTextAnalysisInput {
    nlp: JSON!
    tweetId: String!
  }

  input UpdateTweetTextAnalysisInput {
    nlp: JSON
    tweetId: String
  }
`
