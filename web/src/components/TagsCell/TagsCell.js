import { Link, routes } from '@redwoodjs/router'

import Pagination from 'src/components/Pagination'

export const beforeQuery = ({ page = 1, limit = 20 }) => {
  page = page ? parseInt(page, 10) : 1
  return { variables: { page: page, limit: limit } }
}

export const QUERY = gql`
  query PaginateTagsQuery($page: Int, $limit: Int) {
    results: paginateTagSummaries(page: $page, limit: $limit) {
      tagSummaries {
        label
        entityTypes
        totalCount
        totalMentions
        minMentions
        maxMentions
        avgMentions
        minConfidence
        maxConfidence
        avgConfidence
        minSalience
        maxSalience
        avgSalience
        minSentiment
        maxSentiment
        avgSentiment
      }
      pagination {
        limit
        offset
        total
      }
    }
  }
`

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

export const Success = ({ results }) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Label
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Types
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Total Count
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Total Mentions
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Max Mentions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results?.tagSummaries?.map((tagSummary, index) => {
                    const rowColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    return (
                      <tr key={tagSummary.label} className={rowColor}>
                        <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">
                          {tagSummary.label}
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500">
                          <ul>
                            {tagSummary.entityTypes.map((entityType) => {
                              return (
                                <li
                                  key={`li-label-${tagSummary.label}-${entityType}`}
                                  className="m-1"
                                >
                                  <span
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-200 text-gray-800"
                                    key={`label-${tagSummary.label}-${entityType}`}
                                  >
                                    {entityType}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        </td>
                        <td className="px-6 py-4 text-sm text-right leading-5 text-gray-500">
                          {tagSummary.totalCount}
                        </td>
                        <td className="px-6 py-4 text-sm text-right leading-5 text-gray-500">
                          {tagSummary.totalMentions}
                        </td>
                        <td className="px-6 py-4 text-sm text-right leading-5 text-gray-500">
                          {tagSummary.maxMentions}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        paginatedRoute={routes.tags}
        offset={results?.pagination?.offset}
        total={results?.pagination?.total}
        limit={results?.pagination?.limit}
      />
    </div>
  )
}
