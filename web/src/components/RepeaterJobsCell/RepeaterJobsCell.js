import { Link, routes } from '@redwoodjs/router'

import DateDistance from 'src/components/DateDistance'
import DateDisplay from 'src/components/DateDisplay'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

export const QUERY = gql`
  query RepeaterJobsQuery {
    repeaterJobs {
      name
      enabled
      endpoint
      verb
      headers
      body
      retryable
      runAt
      runEvery
      createdAt
      updatedAt
      lastRunAt
      nextRunAt
    }
  }
`

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ repeaterJobs }) => {
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
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Run At
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Run every
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Last Run
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Next Run
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {repeaterJobs?.map((job, index) => {
                    const rowColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    const color = job.enabled ? 'green' : 'red'

                    return (
                      <tr key={`job-${index}`} className={rowColor}>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <Link
                            to={routes.job({ name: job.name })}
                            className="text-blue-500 hover:text-blue-800"
                          >
                            {job.name}
                          </Link>
                        </td>
                        <td className="text px-6 py-4 whitespace-normal text-sm leading-5 text-gray-500">
                          <DateDisplay date={job.runAt} />
                        </td>
                        <td className="text px-6 py-4 whitespace-normal text-sm leading-5 text-gray-500">
                          {job.runEvery}
                        </td>
                        <td className="text px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <DateDisplay date={job.lastRunAt} />
                        </td>
                        <td className="text px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <DateDisplay date={job.nextRunAt} />
                          <span className="mx-1 text-xs text-gray-500">
                            in
                            <DateDistance
                              className="ml-1"
                              date={job.nextRunAt}
                            />
                          </span>
                        </td>
                        <td className="text px-6 py-4 text-sm leading-5 font-medium text-gray-900">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-${color}-100 text-${color}-800`}
                          >
                            {job.enabled ? 'Yes' : 'No'}
                          </span>
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
    </div>
  )
}
