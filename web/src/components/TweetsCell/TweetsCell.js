import { formatISO9075, parseISO } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'

export const beforeQuery = ({ page = 1, limit = 20 }) => {
  return { variables: { page: page, limit: limit } }
}

export const QUERY = gql`
  query TweetsQuery($page: Int, $limit: Int) {
    results: paginateTweets(page: $page, limit: $limit) {
      tweets {
        id
        entryId
        title
        content
        author
        publishedAt
        priorities: tweetPriorities {
          label
          terms: tweetPriorityTerms {
            label
          }
        }
        tags {
          label
        }
      }
      total
    }
  }
`

const sortUnique = (array) => {
  return array
    ?.sort((a, b) => {
      return a.localeCompare(b, 'en', { sensitivity: 'base' })
    })
    .filter((el, i, a) => i === a.indexOf(el))
}

const tagLabels = (tweet) => {
  return sortUnique(
    (tweet.tags || []).concat(tweet.priorities || []).map((tag) => {
      return tag.label
    })
  )
}

export const Loading = () => <div>Loading...</div>

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
                      Author
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody>
                  {results?.tweets?.map((tweet, index) => {
                    const rowColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    return (
                      <tr key={tweet.id} className={rowColor}>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          {tweet.author}
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500">
                          {tweet.title}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm leading-5 text-gray-500">
                          {tagLabels(tweet).map((label, index) => {
                            return (
                              <span
                                key={`${label}-${index}`}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800"
                              >
                                {label}
                              </span>
                            )
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {formatISO9075(parseISO(tweet.publishedAt))}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </a>
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
      <div className="mt-5 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            Previous
          </a>
          <a
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm leading-5 text-gray-700">
              Showing
              <span className="px-1 font-medium">1</span>
              to
              <span className="px-1 font-medium">10</span>
              of
              <span className="px-1 font-medium">{results?.total | 0}</span>
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex shadow-sm">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Previous"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <Link
                to={routes.tweets({ page: 1 })}
                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                1
              </Link>
              <Link
                to={routes.tweets({ page: 2 })}
                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                2
              </Link>
              <Link
                to={routes.tweets({ page: 3 })}
                className="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                3
              </Link>
              <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                ...
              </span>
              <Link
                to={routes.tweets({ page: 8 })}
                className="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                8
              </Link>
              <Link
                to={routes.tweets({ page: 5 })}
                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                9
              </Link>
              <Link
                to={routes.tweets({ page: 1 })}
                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                10
              </Link>
              <Link
                to={routes.tweets({ page: 1 })}
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Next"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
