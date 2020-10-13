export const schema = gql`
  type TweetStat {
    date: DateTime!
    period: String!
    delta: Int!
    total: Int!
    previousTotal: Int!
    pctChange: Float!
    avg30Period: Float!
    avg7Period: Float!
    avg3Period: Float!
    total30Period: Float!
    total7Period: Float!
    total3Period: Float!
    ranking: Int!
  }

  type Query {
    tweetStats(period: String!, current: Boolean): [TweetStat!]!
  }
`
