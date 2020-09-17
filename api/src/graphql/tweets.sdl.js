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
    context: TweetContext
    categories: [TweetCategory]
    priorities: [TweetPriority]
  }

  type Query {
    tweet(id: String!): Tweet
    tweetByEntryId(entryId: String!): Tweet
    tweetByDocumentId(documentId: String!): Tweet
    tweets: [Tweet!]!
  }

  type Mutation {
    createTweet(tweet: CreateTweetInput!): Tweet!
    loadTweet(entry: CreateEntryInput!): Tweet!
    loadTweets(response: StreamResponse!): [Tweet!]!
  }

  input CreateTweetInput {
    publishedAt: DateTime!
    entryId: String!
    author: String!
    title: String!
    content: String!
    url: String!
  }

  input UpdateTweetInput {
    publishedAt: DateTime
    entryId: String
    author: String
    title: String
    content: String
    url: String
  }
`
