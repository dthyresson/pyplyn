import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { he } from 'date-fns/locale'

export const QUERY = gql`
  query RepeaterJobChartQuery($name: String!) {
    repeaterJobChart(name: $name) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ repeaterJobChart }) => {
  console.log(repeaterJobChart.chart)

  return (
    <div className="h-screen">
      <ResponsiveScatterPlot
        data={repeaterJobChart.chart}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%dT%H:%M:%S.000Z',
          useUTC: true,
          precision: 'second',
        }}
        xFormat="time:%Y-%m-%d %H:%M:%S"
        yScale={{
          type: 'linear',
          min: '0',
          max: 'auto',
          // stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // tickValues: 20,
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle',
          format: '%Y-%m-%d',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Duration',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'paired' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}
