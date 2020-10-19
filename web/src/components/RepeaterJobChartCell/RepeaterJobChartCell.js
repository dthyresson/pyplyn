import { ResponsiveScatterPlot } from '@nivo/scatterplot'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

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

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ repeaterJobChart }) => {
  return (
    <div className="h-screen my-2 bg-white shadow overflow-hidden sm:rounded-lg">
      <ResponsiveScatterPlot
        data={repeaterJobChart.chart}
        margin={{ top: 50, right: 60, bottom: 110, left: 60 }}
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
          max: '10',
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
          tickValues: 3,
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
          legend: 'Duration (secs)',
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
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 60,
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
