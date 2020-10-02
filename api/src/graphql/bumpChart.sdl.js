export const schema = gql`
  type BumpChartSeriesData {
    x: String!
    y: Float!
  }

  type BumpChartSeries {
    id: String!
    data: [BumpChartSeriesData!]!
  }

  type BumpChart {
    chart: [BumpChartSeries!]
  }

  type Query {
    bumpCharts: [BumpChartSeries!]!
    bumpChart: BumpChart!
  }
`
