export const schema = gql`
  type TweetPriority {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tweet: Tweet!
    tweetId: String!
    uid: String!
    label: String!
    tweetPriorityTerms: [TweetPriorityTerm]
  }

  type Query {
    tweetPriorities: [TweetPriority!]!
  }

  input CreateTweetPriorityInput {
    tweetId: String!
    uid: String!
    label: String!
  }

  input UpdateTweetPriorityInput {
    tweetId: String
    uid: String
    label: String
  }
`
