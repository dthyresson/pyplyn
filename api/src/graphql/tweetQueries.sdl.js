export const schema = gql`
  type Query {
    tweet(id: String!): Tweet
    tweetByEntryId(entryId: String!): Tweet
    tweetByDocumentId(documentId: String!): Tweet
  }

  type Mutation {
    createTweet(tweet: CreateTweetInput!): Tweet!
    persistTweet(entry: CreateEntryInput!): Tweet!
    persistTweets(response: StreamResponse!): [Tweet!]!
  }
`
