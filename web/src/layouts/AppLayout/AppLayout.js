import { NavLink, routes } from '@redwoodjs/router'

const AppLayout = ({ children }) => {
  return (
    <div className="p-4">
      <div className="sm:hidden">
        <select aria-label="Selected tab" className="form-select block w-full">
          <option>Dashboard</option>
          <option defaultValue>Tweets</option>
        </select>
      </div>
      <div className="p-4 hidden sm:block">
        <nav className="flex">
          <NavLink
            to={routes.home()}
            className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
            activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
          >
            Dashboard
          </NavLink>

          <NavLink
            to={routes.tweets()}
            className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
            activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
            aria-current="page"
          >
            Tweets
          </NavLink>

          <NavLink
            to={routes.articles()}
            className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
            activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
            aria-current="page"
          >
            Articles
          </NavLink>
          <NavLink
            to={routes.jobs()}
            className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
            activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
          >
            Jobs
          </NavLink>

          <NavLink
            to={routes.job({ name: 'process-entry-stream-job' })}
            className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
            activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
          >
            Schedule Stream
          </NavLink>

          <NavLink
            to={routes.job({ name: 'load-feed-paginated' })}
            className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
            activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
          >
            Process Feed
          </NavLink>
        </nav>
      </div>
      <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

export default AppLayout
