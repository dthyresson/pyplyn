import { useAuth } from '@redwoodjs/auth'
import AppLayout from 'src/layouts/AppLayout'

const ProfilePage = () => {
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
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Email</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default ProfilePage
