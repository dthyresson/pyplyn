export const schema = gql`
  type periodTotalStat {
    duration: Int!
    period: String!
    current: DateTime!
    currentPeriod: DateTime!
    currentPeriodTotal: Int!
    priorPeriod: DateTime!
    priorPeriodTotal: Int!
    delta: Int!
    deltaDirection: Int!
    pctChange: Float!
  }

  type periodTotalStats {
    tweetPeriodTotalStat: periodTotalStat!
    articlePeriodTotalStat: periodTotalStat!
    tagPeriodTotalStat: periodTotalStat!
  }

  type Query {
    periodTotalStats(period: String!): periodTotalStats!
  }
`
