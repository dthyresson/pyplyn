import pluralize from 'pluralize'

import { Link, routes } from '@redwoodjs/router'
import PercentChangeBadge from 'src/components/PercentChangeBadge'

export const beforeQuery = ({
  entityType = 'food',
  period = 'month',
  top = 10,
  score = 0.8,
}) => {
  return { variables: { entityType, period, top, score } }
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ popularTags }) => {
  const { entityType, period, top } = { ...popularTags[0] }
  return (
    <div className="w-1/2 pr-4 mb-4">
      <h2 className="capitalize mb-2 text-lg leading-6 font-medium text-cool-gray-900">
        Top {top} {pluralize(entityType)}
      </h2>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Tag
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Mentions
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      % {period}ly Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200"></tbody>
                {popularTags.map((ranking, index) => {
                  return (
                    <tr
                      key={`tag-${ranking.label}-${ranking.label}-${ranking.period}-${index}`}
                    >
                      <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {ranking.ranking}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">
                        <Link
                          className="text-purple-600 hover:text-purple-900"
                          to={routes.tag({ label: ranking.label })}
                        >
                          {ranking.label}
                        </Link>
                      </td>
                      <td className="text-right px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        <span className="font-medium text-gray-500">
                          {ranking.total}
                        </span>{' '}
                        <span className="text-xs">
                          from {ranking.previousTotal}
                        </span>
                      </td>
                      <td className="text-right px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        <PercentChangeBadge
                          deltaDirection={ranking.deltaDirection}
                          pctChange={ranking.pctChange}
                        />
                      </td>
                    </tr>
                  )
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
