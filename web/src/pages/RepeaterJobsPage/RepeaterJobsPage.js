// import { Link, routes } from '@redwoodjs/router'
import AppLayout from 'src/layouts/AppLayout'
import RepeaterJobsCell from 'src/components/RepeaterJobsCell'

const RepeaterJobsPage = () => {
  return (
    <AppLayout>
      <div className="mt-2 mb-2 flex flex-wrap items-baseline">
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
    </AppLayout>
  )
}

export default RepeaterJobsPage
