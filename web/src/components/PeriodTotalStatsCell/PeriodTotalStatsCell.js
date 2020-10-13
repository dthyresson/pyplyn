import PeriodTotalStat from 'src/components/PeriodTotalStat'

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

export const Success = ({ period, periodTotalStats }) => {
  return (
    <div>
      <h3 className="capitalize text-lg leading-6 font-medium text-gray-900">
        Current {period}
      </h3>
      <div className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
        <div>
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStat
              caption="Tweets"
              periodTotalStat={periodTotalStats.tweetPeriodTotalStat}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 md:border-0 md:border-l">
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStat
              caption="Articles"
              periodTotalStat={periodTotalStats.articlePeriodTotalStat}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 md:border-0 md:border-l">
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStat
              caption="Tags"
              periodTotalStat={periodTotalStats.tagPeriodTotalStat}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
