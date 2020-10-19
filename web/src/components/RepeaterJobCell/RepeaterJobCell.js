import {
  formatDistanceStrict,
  formatDistanceToNowStrict,
  formatISO9075,
  parseISO,
} from 'date-fns'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

export const QUERY = gql`
  query RepeaterJobQuery($name: String!) {
    repeaterJob(name: $name) {
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

export const Success = ({ repeaterJob }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {repeaterJob.name} Job
        </h3>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Name
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {repeaterJob.name}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Enabled
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {repeaterJob.enabled ? 'Yes' : 'No'}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Run At
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {formatISO9075(parseISO(repeaterJob.runAt))}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Run Every
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {repeaterJob.runEvery}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Last Run
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {formatDistanceToNowStrict(parseISO(repeaterJob.lastRunAt))} ago
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Next Run
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {repeaterJob.nextRunAt &&
                formatDistanceStrict(
                  parseISO(repeaterJob.nextRunAt),
                  Date.now()
                )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
  // return (
  //   <div className="bg-white shadow overflow-hidden sm:rounded-lg">
  //     <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
  //       <h3 className="text-lg leading-6 font-medium text-gray-900">
  //         {repeaterJob.name} Job
  //       </h3>
  //       <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
  //         Details and run results
  //       </p>
  //     </div>
  //     <div className="px-4 py-5 sm:p-0">
  //       <dl>
  //         <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
  //           <dt className="text-sm leading-5 font-medium text-gray-500">
  //             Name
  //           </dt>
  //           <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
  //             {repeaterJob.name}
  //           </dd>
  //         </div>
  //         <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
  //           <dt className="text-sm leading-5 font-medium text-gray-500">
  //             Run At
  //           </dt>
  //           <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
  //             {formatISO9075(parseISO(repeaterJob.runAt))}
  //           </dd>
  //         </div>
  //         <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
  //           <dt className="text-sm leading-5 font-medium text-gray-500">
  //             Run every
  //           </dt>
  //           <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
  //             {repeaterJob.runEvery}
  //           </dd>
  //         </div>
  //         <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
  //           <dt className="text-sm leading-5 font-medium text-gray-500">
  //             Last Run
  //           </dt>
  //           <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
  //             {formatDistanceToNowStrict(parseISO(repeaterJob.lastRunAt))} ago
  //           </dd>
  //         </div>
  //         <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
  //           <dt className="text-sm leading-5 font-medium text-gray-500">
  //             Next Run
  //           </dt>
  //           <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
  //             {repeaterJob.nextRunAt &&
  //               formatDistanceStrict(
  //                 parseISO(repeaterJob.nextRunAt),
  //                 Date.now()
  //               )}
  //           </dd>
  //         </div>
  //         <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
  //           <dt className="text-sm leading-5 font-medium text-gray-500">
  //             Enabled
  //           </dt>
  //           <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
  //             {repeaterJob.enabled}
  //           </dd>
  //         </div>
  //       </dl>
  //     </div>
  //   </div>
  // )
}
