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
    <div className="p-2">
      <div className="pb-5 border-b border-gray-200">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            Tags
          </h3>
          <p className="ml-2 mt-1 text-sm leading-5 text-gray-500 truncate">
            found in Tweets and Articles
          </p>
        </div>
      </div>
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          {results?.tagSummaries?.map((tagSummary, index) => {
            return (
              <li
                className={index === 0 ? '' : 'border-t border-gray-200'}
                key={`tag-list-${tagSummary.label}-${index}`}
              >
                <Link
                  to={routes.tag({ label: tagSummary.label })}
                  className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                        {tagSummary.label}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {tagSummary.totalMentions} Mentions
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="mr-2 flex items-center text-sm leading-5 text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {tagSummary.totalCount} times
                        </div>

                        <div className="mt-2 mr-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {tagSummary.avgConfidence.toFixed(3)} score
                        </div>
                        {tagSummary.entityTypes.length > 0 && (
                          <div className="mt-2 mr-2 flex flex-wrapitems-center text-sm leading-5 text-gray-500 sm:mt-0">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            {tagSummary.entityTypes.map((label, index) => {
                              return (
                                <span
                                  key={`${tagSummary.label}-${label}-${index}`}
                                  className="px-2 mr-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-500 truncate"
                                >
                                  {label}
                                </span>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
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
