export const schema = gql`
  type TagSummary {
    label: String!
    entityTypes: [String!]
    totalCount: Int!
    maxMentions: Int!
    minMentions: Int!
    totalMentions: Int!
    avgMentions: Float!
    avgConfidence: Float!
    minConfidence: Float!
    maxConfidence: Float!
    minSalience: Float!
    maxSalience: Float!
    avgSalience: Float!
    minSentiment: Float!
    maxSentiment: Float!
    avgSentiment: Float!
  }

  type TagSummariesSet {
    tagSummaries: [TagSummary!]!
    pagination: Pagination!
  }

  type Query {
    paginateTagSummaries(page: Int, limit: Int): TagSummariesSet
    tagSummaries: [TagSummary!]!
  }
`
