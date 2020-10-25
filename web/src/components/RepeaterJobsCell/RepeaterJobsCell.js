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
    <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        {repeaterJobs?.map((job, index) => {
          const color = job.enabled ? 'green' : 'red'

          return (
            <li
              key={`job-${job.name}-${index}`}
              className={index === 0 ? '' : 'border-t border-gray-200'}
            >
              <Link
                to={routes.job({ name: job.name })}
                className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                      {job.name}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${color}-100 text-${color}-800`}
                      >
                        {job.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="mr-2 flex items-center text-sm leading-5 text-gray-500">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        {job.runEvery}
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
                        <DateDisplay date={job.nextRunAt} relative={true} />
                        <DateDistance
                          date={job.nextRunAt}
                          className="text-xs"
                        />
                      </div>
                      {job.lastRunAt && (
                        <div className="mt-2 mr-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <DateDistance date={job.lastRunAt} ago={true} />
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
  )
}

// export const Success = ({ repeaterJobs }) => {
//   return (
//     <div>
//       <div className="flex flex-col">
//         <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//             <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead>
//                   <tr>
//                     <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                       Run At
//                     </th>
//                     <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                       Run every
//                     </th>
//                     <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                       Last Run
//                     </th>
//                     <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                       Next Run
//                     </th>
//                     <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {repeaterJobs?.map((job, index) => {
//                     const rowColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                     const color = job.enabled ? 'green' : 'red'

//                     return (
//                       <tr key={`job-${index}`} className={rowColor}>
//                         <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
//                           <Link
//                             to={routes.job({ name: job.name })}
//                             className="text-blue-500 hover:text-blue-800"
//                           >
//                             {job.name}
//                           </Link>
//                         </td>
//                         <td className="text px-6 py-4 whitespace-normal text-sm leading-5 text-gray-500">
//                           <DateDisplay date={job.runAt} />
//                         </td>
//                         <td className="text px-6 py-4 whitespace-normal text-sm leading-5 text-gray-500">
//                           {job.runEvery}
//                         </td>
//                         <td className="text px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
//                           <DateDisplay date={job.lastRunAt} />
//                         </td>
//                         <td className="text px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
//                           <DateDisplay date={job.nextRunAt} />
//                           <span className="mx-1 text-xs text-gray-500">
//                             in
//                             <DateDistance
//                               className="ml-1"
//                               date={job.nextRunAt}
//                             />
//                           </span>
//                         </td>
//                         <td className="text px-6 py-4 text-sm leading-5 font-medium text-gray-900">
//                           <span
//                             className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-${color}-100 text-${color}-800`}
//                           >
//                             {job.enabled ? 'Yes' : 'No'}
//                           </span>
//                         </td>
//                       </tr>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
