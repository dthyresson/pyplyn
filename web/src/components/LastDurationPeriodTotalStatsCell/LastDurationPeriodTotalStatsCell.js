import { routes } from '@redwoodjs/router'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

import PeriodTotalStat from 'src/components/PeriodTotalStat'

export const beforeQuery = ({ duration = 7, period = 'day' }) => {
  return { variables: { duration, period }, pollInterval: 1000 * 60 * 55 }
}

export const QUERY = gql`
  query lastDurationPeriodTotalStatsQuery($duration: Int!, $period: String!) {
    periodTotalStats: lastDurationPeriodTotalStats(
      duration: $duration
      period: $period
    ) {
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

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ duration, period, periodTotalStats }) => {
  return (
    <div>
      <h3 className="capitalize text-lg leading-6 font-medium text-gray-900">
        {`Last ${duration} ${period}s`}
      </h3>
      <div className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
        <div>
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStat
              caption="Tweets"
              periodTotalStat={periodTotalStats.tweetPeriodTotalStat}
              route={routes.tweets()}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 md:border-0 md:border-l">
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStat
              caption="Articles"
              periodTotalStat={periodTotalStats.articlePeriodTotalStat}
              route={routes.articles()}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 md:border-0 md:border-l">
          <div className="px-4 py-5 sm:p-6">
            <PeriodTotalStat
              caption="Food Related Tags"
              periodTotalStat={periodTotalStats.tagPeriodTotalStat}
              route={routes.tags()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
