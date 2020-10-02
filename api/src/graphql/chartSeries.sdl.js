export const schema = gql`
  type ChartSeriesData {
    x: String!
    y: Float!
  }

  type ChartSeries {
    id: String!
    data: [ChartSeriesData!]!
  }
`
