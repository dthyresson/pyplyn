export const schema = gql`
  type BumpChart {
    chart: [ChartSeries!]
  }

  type Query {
    bumpChart: BumpChart!
  }
`
