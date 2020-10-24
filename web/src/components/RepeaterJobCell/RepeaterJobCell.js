import DateDistance from 'src/components/DateDistance'
import DateDisplay from 'src/components/DateDisplay'

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

const RepeaterJobBody = ({ job }) => {
  try {
    return (
      job.body && (
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(JSON.parse(job.body), null, 4)}
        </pre>
      )
    )
  } catch {
    return <div></div>
  }
}

const RepeaterJobHeaders = ({ job }) => {
  try {
    return (
      job.headers && (
        <pre className="whitespace-pre-wrap">{JSON.stringify(job.headers)}</pre>
      )
    )
  } catch {
    return <div></div>
  }
}

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ repeaterJob }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-b border-gray-200 sm:px-6">
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
              <DateDisplay date={repeaterJob.runAt} relative={true} />
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
              <DateDistance date={repeaterJob.lastRunAt} ago={true} />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Next Run
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              <DateDistance date={repeaterJob.nextRunAt} />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Body
            </dt>
            <dd className="mt-1 text-xs leading-5 text-gray-700">
              {<RepeaterJobBody job={repeaterJob} />}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Headers
            </dt>
            <dd className="mt-1 text-xs leading-5 text-gray-700">
              {<RepeaterJobHeaders job={repeaterJob} />}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
