export const schema = gql`
  type Tweet {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publishedAt: DateTime!
    entry: Entry!
    entryId: String!
    author: String!
    title: String!
    content: String!
    url: String!
    sentiment: Float!
    tweetContext: TweetContext
    tweetCategories: [TweetCategory]!
    tweetPriorities: [TweetPriority]!
  }

  type Query {
    tweets: [Tweet!]!
  }

  input CreateTweetInput {
    publishedAt: DateTime!
    entryId: String!
    author: String!
    title: String!
    content: String!
    url: String!
    sentiment: Float!
  }

  input UpdateTweetInput {
    publishedAt: DateTime
    entryId: String
    author: String
    title: String
    content: String
    url: String
    sentiment: Float
  }
`
