import { ResponsiveAreaBump } from '@nivo/bump'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

export const beforeQuery = () => {
  return {
    pollInterval: 1000 * 60 * 55,
  }
}

export const QUERY = gql`
  query AreaBumpChartQuery {
    bumpChart {
      chart {
        id
        data {
          x
          y
        }
      }
    }
  }
`

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveAreaBump = ({ data /* see data tab */ }) => (
  <ResponsiveAreaBump
    data={data}
    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
    spacing={14}
    colors={{ scheme: 'spectral' }}
    blendMode="multiply"
    defs={[]}
    fill={[]}
    startLabel="id"
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendPosition: 'middle',
      legendOffset: -36,
    }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      tickValues: 4,
      legend: '',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
  />
)

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ bumpChart }) => {
  return MyResponsiveAreaBump({ data: bumpChart.chart })
}
