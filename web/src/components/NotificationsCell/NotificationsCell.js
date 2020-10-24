import { Link, routes } from '@redwoodjs/router'

import DateDisplay from 'src/components/DateDisplay'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

export const beforeQuery = () => {
  return {
    pollInterval: 1000 * 60 * 5,
  }
}

export const QUERY = gql`
  query NotificationsQuery {
    notifications: recentNotifications {
      id
      documentType
      message
      action
      tweetId
      articleId
      updatedAt

      tweet {
        author
      }

      article {
        author
        siteName
      }
    }
  }
`

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ _error }) => <FailureMessage />

export const Success = ({ notifications }) => {
  return (
    <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        {notifications.map((notification, index) => {
          const path =
            notification.documentType === 'TWEET'
              ? routes.tweet({ id: notification.tweetId })
              : routes.article({ id: notification.articleId })

          const author =
            notification.documentType === 'TWEET'
              ? notification?.tweet.author
              : notification?.article.author

          const actionColor =
            notification.action === 'UPDATE' ? 'orange' : 'purple'

          return (
            <li
              key={`notification-${notification.id}`}
              className={index === 0 ? '' : 'border-t border-gray-200'}
            >
              <Link
                to={path}
                className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                      {notification.message}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${actionColor}-100 text-${actionColor}-800`}
                      >
                        {notification.action}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      {author !== 'unknown' && (
                        <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                          {notification.documentType === 'TWEET' && (
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}

                          {notification.documentType === 'ARTICLE' && (
                            <svg
                              className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          )}

                          {author}
                        </div>
                      )}
                      <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                        {notification.documentType === 'TWEET' && <div></div>}
                        {notification.documentType === 'ARTICLE' && (
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        )}
                        <span className="px-1">
                          {notification.article?.siteName}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
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
                      <span>
                        <time dateTime="2020-01-07">
                          <DateDisplay
                            date={notification.updatedAt}
                            relative={true}
                          />
                        </time>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
