import { Link, routes } from '@redwoodjs/router'

const AppLayout = ({ children }) => {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <Link
              class="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              to={routes.tweets()}
            >
              Tweets
            </Link>
          </div>
        </div>
      </nav>
      <div className="py-10 max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

export default AppLayout
