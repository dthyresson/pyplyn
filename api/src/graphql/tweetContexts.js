export const schema = gql`
  type TweetContext {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tweet: Tweet!
    tweetId: String!
    content: JSON!
  }

  type Query {
    tweetContexts: [TweetContext!]!
  }

  input CreateTweetContextInput {
    content: JSON!
    tweetId: String!
  }

  input UpdateTweetContextInput {
    content: JSON
    tweetId: String
  }
`
