import pluralize from 'pluralize'

import { Link, routes } from '@redwoodjs/router'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

import PercentChangeBadge from 'src/components/PercentChangeBadge'

export const beforeQuery = ({
  entityType = 'food',
  period = 'month',
  top = 10,
  score = 0.8,
}) => {
  return {
    variables: { entityType, period, top, score },
    pollInterval: 1000 * 60 * 15,
  }
}

export const QUERY = gql`
  query popularTagsQuery(
    $entityType: String
    $period: String
    $top: Int
    $score: Float
  ) {
    popularTags(
      entityType: $entityType
      period: $period
      top: $top
      score: $score
    ) {
      entityType
      top
      period
      score
      date
      label
      total
      previousTotal
      delta
      deltaDirection
      pctChange
      ranking
      rankingPctChange
    }
  }
`

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

const RANKING_COLORS = [
  'blue',
  'yellow',
  'orange',
  'pink',
  'red',
  'green',
  'purple',
  'teal',
]

const colorForRanking = (ranking) => {
  let color = RANKING_COLORS[ranking - 1]
  return color !== undefined ? color : 'gray'
}

export const Success = ({ popularTags }) => {
  const { entityType, period, top } = { ...popularTags[0] }
  return (
    <div className="mb-4">
      <h2 className="capitalize mb-4 text-lg leading-6 font-medium text-cool-gray-900">
        Top {top} {pluralize(entityType)}
      </h2>
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          {popularTags.map((ranking, index) => {
            const rankingColor = colorForRanking(ranking.ranking)

            return (
              <li
                className={index === 0 ? '' : 'border-t border-gray-200'}
                key={`tweet-list-${ranking.id}-${index}`}
              >
                <Link
                  to={routes.tag({ label: ranking.label })}
                  className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={`text-sm leading-5 font-medium text-${rankingColor}-600 truncate`}
                      >
                        {ranking.label}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <PercentChangeBadge
                          deltaDirection={ranking.deltaDirection}
                          pctChange={ranking.pctChange}
                          total={ranking.total}
                          previousTotal={ranking.previousTotal}
                        />
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div
                          className={`mr-2 flex items-center text-xs font-medium leading-5 text-${rankingColor}-400`}
                        >
                          <svg
                            className={`flex-shrink-0 mr-1.5 h-5 w-5 text-${rankingColor}-400`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>{' '}
                          </svg>
                          {ranking.ranking}
                        </div>
                      </div>

                      <div className="sm:flex">
                        <div className="mr-2 flex items-center text-xs leading-5 text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {ranking.total} from {ranking.previousTotal} last{' '}
                          {period}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
