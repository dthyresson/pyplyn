import { ResponsiveLine } from '@nivo/line'

export const QUERY = gql`
  query LineChartQuery {
    lineChart {
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

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 200, bottom: 40, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: false,
      reverse: false,
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Date',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Mentions',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    colors={{ scheme: 'purple_blue' }}
    curve={'natural'}
    lineWidth={2}
    pointSize={4}
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
        translateY: -20,
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
    enableSlices="x"
    sliceTooltip={({ slice }) => {
      return (
        <div
          style={{
            background: 'white',
            padding: '9px 12px',
            border: '1px solid #ccc',
          }}
        >
          {slice.points.map((point) => {
            if (point.data.y !== 0) {
              return (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: '3px 0',
                    fontSize: '12px',
                  }}
                >
                  <strong>{point.serieId}</strong> ({point.data.yFormatted})
                </div>
              )
            }
          })}
          <p style={{ fontSize: '12px', textAlign: 'center' }}>
            {slice.points[0].data.x}
          </p>
        </div>
      )
    }}
  />
)

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ lineChart }) => {
  return MyResponsiveLine({ data: lineChart.chart })
}
