export const schema = gql`
  type TweetPriorityTerm {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tweetPriority: TweetPriority
    tweetPriorityId: String
    uid: String!
    label: String!
  }

  type Query {
    tweetPriorityTerms: [TweetPriorityTerm!]!
  }

  input CreateTweetPriorityTermInput {
    tweetPriorityId: String
    uid: String!
    label: String!
  }

  input UpdateTweetPriorityTermInput {
    tweetPriorityId: String
    uid: String
    label: String
  }
`
