export const beforeQuery = ({ period }) => {
  return { variables: { period } }
}

export const QUERY = gql`
  query periodTotalStatsQuery($period: String!) {
    periodTotalStats(period: $period) {
      tweetPeriodTotalStat {
        duration
        period
        current
        currentPeriod
        currentPeriodTotal
        priorPeriod
        priorPeriodTotal
        delta
        deltaDirection
        pctChange
      }
      articlePeriodTotalStat {
        duration
        period
        current
        currentPeriod
        currentPeriodTotal
        priorPeriod
        priorPeriodTotal
        delta
        deltaDirection
        pctChange
      }
      tagPeriodTotalStat {
        duration
        period
        current
        currentPeriod
        currentPeriodTotal
        priorPeriod
        priorPeriodTotal
        delta
        deltaDirection
        pctChange
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

const downArrow = (
  <path
    fillRule="evenodd"
    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
    clipRule="evenodd"
  />
)

const upArrow = (
  <path
    fillRule="evenodd"
    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
    clipRule="evenodd"
  />
)

const PeriodTotalStatBox = ({ caption, periodTotalStat }) => {
  let pctChangeCaption = 'No change'
  let pctChangeColor = 'gray'
  let arrow = upArrow

  if (periodTotalStat.deltaDirection > 0) {
    pctChangeCaption = 'Increased by'
    pctChangeColor = 'green'
    arrow = upArrow
  } else if (periodTotalStat.deltaDirection < 0) {
    pctChangeCaption = 'Decreased by'
    pctChangeColor = 'red'
    arrow = downArrow
  }

  let pctChangeArrow = (
    <svg
      className={`-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-${pctChangeColor}-500`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      {arrow}
    </svg>
  )

  return (
    <dl>
      <dt className="capitalize text-base leading-6 font-normal text-gray-900">
        Total {caption}
      </dt>
      <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
        <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
          {periodTotalStat.currentPeriodTotal}
          <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
            from {periodTotalStat.priorPeriodTotal}
          </span>
        </div>
        <div
          className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-${pctChangeColor}-100 text-${pctChangeColor}-800 md:mt-2 lg:mt-0`}
        >
          {pctChangeArrow}
          <span className="sr-only capitalize">{pctChangeCaption}</span>
          {periodTotalStat.pctChange.toFixed(0)}%
        </div>
      </dd>
    </dl>
  )
}
export const Success = ({ period, periodTotalStats }) => {
  return (
    <div>
      <h3 className="capitalize text-lg leading-6 font-medium text-gray-900">
        Current {period}
      </h3>
      <div className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
        <div>
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStatBox
              caption="Tweets"
              periodTotalStat={periodTotalStats.tweetPeriodTotalStat}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 md:border-0 md:border-l">
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStatBox
              caption="Articles"
              periodTotalStat={periodTotalStats.articlePeriodTotalStat}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 md:border-0 md:border-l">
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStatBox
              caption="Tags"
              periodTotalStat={periodTotalStats.tagPeriodTotalStat}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
