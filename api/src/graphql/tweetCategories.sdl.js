export const schema = gql`
  type TweetCategory {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tweet: Tweet!
    tweetId: String!
    uid: String!
    label: String!
  }

  type Query {
    tweetCategories: [TweetCategory!]!
  }

  input CreateTweetCategoryInput {
    tweetId: String!
    uid: String!
    label: String!
  }

  input UpdateTweetCategoryInput {
    tweetId: String
    uid: String
    label: String
  }
`
