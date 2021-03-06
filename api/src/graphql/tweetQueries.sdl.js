export const schema = gql`
  type TweetsSet {
    tweets: [Tweet!]!
    pagination: Pagination!
  }

  type Query {
    paginateTweets(page: Int, limit: Int): TweetsSet
    tweetById(id: String!): Tweet
    tweetByEntryId(entryId: String!): Tweet
    tweetByDocumentId(documentId: String!): Tweet
    tweetsForLabel(label: String!): [Tweet]
  }

  type Mutation {
    createTweet(tweet: CreateTweetInput!): Tweet!
    persistTweet(entry: CreateEntryInput!): Tweet!
    persistTweets(response: StreamResponse!): [Tweet!]!
    refreshTweet(id: String!): Tweet!
  }
`
