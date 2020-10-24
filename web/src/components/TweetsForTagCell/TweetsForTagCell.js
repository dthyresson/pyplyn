import { Link, routes } from '@redwoodjs/router'

import DateDisplay from 'src/components/DateDisplay'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

export const beforeQuery = ({ label }) => {
  return { variables: { label } }
}

export const QUERY = gql`
  query TweetsForTagQuery($label: String!) {
    tweets: tweetsForLabel(label: $label) {
      id
      publishedAt
      author
      title
      entryId

      categories: tweetCategories {
        id
        label
      }

      priorities: tweetPriorities {
        id
        label
        terms: tweetPriorityTerms {
          id
          label
        }
      }

      tags {
        id
        label
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
    .slice(0, 10)
}

const tagLabels = (tweet) => {
  return sortUnique(
    tweet.priorities?.map((tag) => {
      return tag.label
    })
  )
}

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ tweets }) => {
  return (
    <div className="p-2">
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          {tweets?.map((tweet, index) => {
            const labels = tagLabels(tweet)

            return (
              <li
                className={index === 0 ? '' : 'border-t border-gray-200'}
                key={`tweet-list-${tweet.id}-${index}`}
              >
                <Link
                  to={routes.tweet({ id: tweet.id })}
                  className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                        {tweet.title}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        {tweet.categories.map((category, index) => {
                          return (
                            <span
                              key={`${tweet.id}-${category.id}-${index}`}
                              className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800"
                            >
                              {category.label}
                            </span>
                          )
                        })}
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
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          {tweet.author}
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
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <DateDisplay date={tweet.publishedAt} />
                        </div>
                        {labels.length > 0 && (
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
                            {labels.map((label, index) => {
                              return (
                                <span
                                  key={`${tweet.id}-${label}-${index}`}
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
    </div>
  )
}
