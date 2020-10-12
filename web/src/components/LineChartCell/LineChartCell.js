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
    xScale={{
      type: 'time',
      format: '%Y-%m-%d',
      useUTC: false,
      precision: 'day',
    }}
    xFormat="time:%Y-%m-%d"
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
      tickValues: 5,
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
      legend: 'Mentions',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    colors={{ scheme: 'paired' }}
    curve={'natural'}
    lineWidth={2}
    pointSize={4}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    tooltip={({ point }) => {
      return (
        <div className="col-span-1 flex shadow-sm rounded-md">
          <div
            style={{ backgroundColor: point.serieColor }}
            className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm leading-5 font-medium rounded-l-md"
          >
            {point.data.yFormatted}
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
              <a
                href="#"
                className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
              >
                {point.serieId}
              </a>
              <p className="text-gray-500">
                {' '}
                Mentions on {point.data.xFormatted}
              </p>
            </div>
          </div>
        </div>
      )
    }}
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
    enableSlices={false}
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

export const Loading = () => (
  <div className="overflow-hidden bg-white text-center p-4 py-12">
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150 cursor-not-allowed"
        disabled=""
      >
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading
      </button>
    </span>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ lineChart }) => {
  return MyResponsiveLine({ data: lineChart.chart })
}
