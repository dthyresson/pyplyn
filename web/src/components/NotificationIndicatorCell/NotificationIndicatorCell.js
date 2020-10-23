import { navigate, routes } from '@redwoodjs/router'

export const beforeQuery = () => {
  return {
    pollInterval: 1000 * 60 * 5,
  }
}

export const QUERY = gql`
  query NotificationIndicatorQuery {
    recentNotificationCount
  }
`

export const Loading = () => (
  <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray focus:outline-none focus:text-white focus:bg-gray-700">
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  </button>
)

export const Empty = () => <div></div>

export const Failure = ({ _error }) => <div></div>

export const Success = ({ recentNotificationCount }) => {
  const hasNotifications = recentNotificationCount > 0
  const color = hasNotifications ? 'orange' : 'gray'
  const animated = hasNotifications ? 'animate-pulse' : ''

  return (
    <button
      className={`${animated} p-1 border-2 border-transparent text-${color}-400 rounded-full hover:text-${color} focus:outline-none focus:text-${color} focus:bg-gray-700 transition duration-150 ease-in-out`}
      onClick={async (_event) => {
        navigate(routes.notifications())
      }}
      aria-label="Notifications"
    >
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </button>
  )
}
