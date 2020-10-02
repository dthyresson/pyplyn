import { ResponsiveAreaBump } from '@nivo/bump'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveAreaBump = ({ data /* see data tab */ }) => (
  <ResponsiveAreaBump
    data={data}
    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
    spacing={18}
    colors={{ scheme: 'nivo' }}
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
      legend: '',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
  />
)

export const QUERY = gql`
  query AreaBumpChartQuery {
    data: bumpCharts {
      id
      data {
        x
        y
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ data }) => {
  console.log(data)
  return MyResponsiveAreaBump({ data })
}
