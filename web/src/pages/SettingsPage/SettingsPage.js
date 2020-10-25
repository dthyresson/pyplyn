import { useAuth } from '@redwoodjs/auth'
import AppLayout from 'src/layouts/AppLayout'

const SettingsPage = () => {
  const { userMetadata } = useAuth()

  return (
    <AppLayout>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {userMetadata.email}
                </h3>
                <p className="text-sm leading-5 text-gray-500">
                  <a href="#">{userMetadata.email}</a>
                </p>
              </div>
            </div>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0 flex">
            <span className="ml-3 inline-flex rounded-md shadow-sm">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
                >
                  Edit Settings
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default SettingsPage
