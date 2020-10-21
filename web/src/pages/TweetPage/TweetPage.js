import { Flash, useFlash, useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

import AppLayout from 'src/layouts/AppLayout'
import TweetCell from 'src/components/TweetCell'

const REFRESH_TWEET = gql`
  mutation REFRESH_TWEET($id: String!) {
    refreshTweet(id: $id) {
      id
      title
    }
  }
`

const TweetPage = ({ id }) => {
  const { isAuthenticated } = useAuth()

  const { addMessage } = useFlash()

  const RefreshTweet = () => {
    const [refreshTweet, { loading, error, data }] = useMutation(
      REFRESH_TWEET,
      {
        onCompleted: ({ refreshTweet }) => {
          addMessage(`Request to refresh '${refreshTweet.title}'`, {
            style: {
              backgroundColor: 'green',
              color: 'white',
              padding: '1rem',
            },
          })
        },
      }
    )

    return (
      <span className="rounded-md shadow-sm">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          onClick={(e) => {
            e.preventDefault()
            refreshTweet({ variables: { id } })
          }}
        >
          <svg
            className="-ml-0.5 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            ></path>
          </svg>
          Refresh
        </button>
      </span>
    )
  }

  return (
    <AppLayout>
      <Flash timeout={2000} />

      <div className="mb-4 pb-4 border-b border-gray-200 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
        <div className="space-y-3 sm:flex sm:items-center sm:justify-start sm:space-x-4 sm:space-y-0">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Tweet</h3>
          <p className="ml-2 mt-1 text-sm leading-5 text-gray-500 truncate">
            NLP tags and data
          </p>
        </div>
        <div>{isAuthenticated && <RefreshTweet />}</div>
      </div>

      <TweetCell id={id}></TweetCell>
    </AppLayout>
  )
}

export default TweetPage
