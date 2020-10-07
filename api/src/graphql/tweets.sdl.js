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
    tags: [Tag]!
    articles: [Article]!
  }

  type Query {
    tweets: [Tweet!]!
    tweet(id: String!): Tweet
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

  type Mutation {
    createTweet(input: CreateTweetInput!): Tweet!
    updateTweet(id: String!, input: UpdateTweetInput!): Tweet!
    deleteTweet(id: String!): Tweet!
  }
`
