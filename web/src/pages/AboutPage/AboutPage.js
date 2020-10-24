import AppLayout from 'src/layouts/AppLayout'

const AboutPage = () => {
  return (
    <AppLayout>
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:col-gap-8">
          <div>
            <h2 className="text-base leading-6 font-semibold text-indigo-600 uppercase tracking-wide">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl leading-9 font-extrabold text-gray-900">
              All-in-one platform
            </p>
            <p className="mt-4 text-lg leading-7 text-gray-500">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
              Malesuada adipiscing sagittis vel nulla nec.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:col-gap-6 sm:row-gap-10 lg:col-gap-8">
              <div className="flex space-x-3">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Invite team members
                  </dt>
                  <dd className="flex space-x-3 lg:py-0 lg:pb-4">
                    <span className="text-base leading-6 text-gray-500">
                      You can manage phone, email and chat conversations all
                      from a single mailbox.
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex space-x-3">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    List view
                  </dt>
                  <dd className="flex space-x-3">
                    <span className="text-base leading-6 text-gray-500">
                      You can manage phone, email and chat conversations all
                      from a single mailbox.
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex space-x-3">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Keyboard shortcuts
                  </dt>
                  <dd className="flex space-x-3">
                    <span className="text-base leading-6 text-gray-500">
                      You can manage phone, email and chat conversations all
                      from a single mailbox.
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex space-x-3">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Calendars
                  </dt>
                  <dd className="flex space-x-3">
                    <span className="text-base leading-6 text-gray-500">
                      You can manage phone, email and chat conversations all
                      from a single mailbox.
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex space-x-3">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Notifications
                  </dt>
                  <dd className="flex space-x-3">
                    <span className="text-base leading-6 text-gray-500">
                      Find what you need with advanced filters, bulk actions,
                      and quick views.
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex space-x-3">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Boards
                  </dt>
                  <dd className="flex space-x-3 lg:border-t-0 lg:py-0 lg:pb-4">
                    <span className="text-base leading-6 text-gray-500">
                      Find what you need with advanced filters, bulk actions,
                      and quick views.
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex space-x-3">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Reporting
                  </dt>
                  <dd className="flex space-x-3">
                    <span className="text-base leading-6 text-gray-500">
                      Find what you need with advanced filters, bulk actions,
                      and quick views.
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex space-x-3">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-2">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Mobile app
                  </dt>
                  <dd className="flex space-x-3">
                    <span className="text-base leading-6 text-gray-500">
                      Find what you need with advanced filters, bulk actions,
                      and quick views.
                    </span>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default AboutPage
