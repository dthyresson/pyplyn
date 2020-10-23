import { useAuth } from '@redwoodjs/auth'
import { Flash, useFlash, useMutation } from '@redwoodjs/web'

import AppLayout from 'src/layouts/AppLayout'
import RepeaterJobsCell from 'src/components/RepeaterJobsCell'

const DELETE_COMPLETED_REPEATER_JOBS = gql`
  mutation DELETE_COMPLETED_REPEATER_JOBS {
    deleteCompletedRepeaterJobs {
      name
    }
  }
`

const RepeaterJobsPage = () => {
  const { isAuthenticated } = useAuth()

  const { addMessage } = useFlash()

  const DeleteCompletedRepeaterJobs = () => {
    const [
      deleteCompletedRepeaterJobs,
      { _loading, _error, _data },
    ] = useMutation(DELETE_COMPLETED_REPEATER_JOBS, {
      onCompleted: ({ deleteCompletedRepeaterJobs }) => {
        addMessage(`Deleted ${deleteCompletedRepeaterJobs?.length} jobs`, {
          classes:
            'animate-bounce my-4 rounded-md bg-green-50 p-4 text-sm leading-5 font-medium text-green-800 flex justify-between',
        })
      },
    })

    return (
      <span className="rounded-md shadow-sm">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
          onClick={(e) => {
            e.preventDefault()
            deleteCompletedRepeaterJobs()
          }}
        >
          <svg
            className="-ml-0.5 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          Clean Up
        </button>
      </span>
    )
  }
  return (
    <AppLayout>
      <Flash timeout={2000} />

      <div className="mb-2 flex flex-wrap items-baseline">
        <h3 className="capitalize ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
          Background Jobs
        </h3>
        <p className="ml-2 mt-1 text-sm leading-5 text-gray-500 truncate">
          scheduled via
          <a
            className="ml-1 text-blue-500"
            href="https://www.repeater.dev"
            target="_blank"
            rel="noreferrer"
          >
            Repeater.dev
          </a>
        </p>
      </div>
      <RepeaterJobsCell />
      <div className="p-6 text-center">
        {isAuthenticated && <DeleteCompletedRepeaterJobs />}
      </div>
    </AppLayout>
  )
}

export default RepeaterJobsPage
