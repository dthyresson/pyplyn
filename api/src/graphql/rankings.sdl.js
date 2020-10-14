export const schema = gql`
  type Ranking {
    entityType: String!
    top: Int!
    period: String!
    score: Float!
    date: DateTime!
    label: String!
    total: Int!
    previousTotal: Int!
    delta: Int!
    deltaDirection: Int!
    pctChange: Float!
    ranking: Int!
    rankingPctChange: Int!
  }

  type Query {
    popularTags(
      top: Int
      entityType: String
      period: String
      score: Float
    ): [Ranking]
  }
`
