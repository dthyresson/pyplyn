export const schema = gql`
  type LineChart {
    chart: [ChartSeries!]
  }

  type Query {
    lineChart: LineChart!
  }
`
