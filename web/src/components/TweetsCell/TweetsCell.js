import { routes } from '@redwoodjs/router'
import { formatISO9075, parseISO } from 'date-fns'

// import { Link, routes } from '@redwoodjs/router'

import Pagination from 'src/components/Pagination'

export const beforeQuery = ({ page = 1, limit = 20 }) => {
  page = page ? parseInt(page, 10) : 1
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
      pagination {
        limit
        offset
        total
      }
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
    tweet.priorities?.map((tag) => {
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
                      Title
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Author
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
                        <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">
                          {tweet.title}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {tweet.author}
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
      <Pagination
        paginatedRoute={routes.tweets}
        offset={results?.pagination?.offset}
        total={results?.pagination?.total}
        limit={results?.pagination?.limit}
      />
    </div>
  )
}
