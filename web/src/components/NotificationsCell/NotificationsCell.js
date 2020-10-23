import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query NotificationsQuery {
    notifications: recentNotifications {
      id
      documentType
      message
      action
      tweetId
      articleId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ notifications }) => {
  return (
    <ul>
      {notifications.map((notification, index) => {
        const path =
          notification.documentType === 'TWEET'
            ? routes.tweet({ id: notification.tweetId })
            : routes.article({ id: notification.articleId })
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
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
