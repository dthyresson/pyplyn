import { useState } from 'react'

import { Transition } from '@tailwindui/react'

import { NavLink, routes } from '@redwoodjs/router'

const AppLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, _setIsProfileOpen] = useState(false)

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Transition show={!isOpen}>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Transition>
                <Transition show={isOpen}>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Transition>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <svg
                  className="block lg:hidden h-8 w-auto"
                  fill="white"
                  viewBox="0 0 100 100"
                  alt="Pyplyn logo"
                >
                  <path d="m66.191 85.555-11.504-1.043v-25.98c0.003906-1.4883 1.0547-2.7695 2.5117-3.0664 5.6641-1.1328 10.66-4.4297 13.93-9.1914 3.2656-4.7656 4.5469-10.613 3.5664-16.305l-4.4062-25.547c-0.12891-0.75-0.77734-1.2969-1.5391-1.2969h-37.5c-0.76172 0-1.4102 0.54688-1.5391 1.2969l-4.4062 25.547c-0.98047 5.6914 0.30078 11.539 3.5664 16.305 3.2695 4.7617 8.2656 8.0586 13.93 9.1914 1.457 0.29688 2.5078 1.5781 2.5117 3.0664v25.98l-11.504 1.0469v-0.003906c-3.2266 0.28125-5.6992 2.9883-5.6836 6.2266v0.40625c0 0.41406 0.16406 0.8125 0.45703 1.1055s0.69141 0.45703 1.1055 0.45703h40.625c0.41406 0 0.8125-0.16406 1.1055-0.45703s0.45703-0.69141 0.45703-1.1055v-0.40625c0.015625-3.2383-2.457-5.9453-5.6836-6.2266zm-0.21484-42.82c-0.22266 0.32812-0.46094 0.64453-0.70703 0.95312v0.003906c-0.24609 0.30469-0.60938 0.49609-1.0039 0.51953-0.39062 0.027343-0.77734-0.11719-1.0586-0.39063l-0.24609-0.23828c-0.51172-0.49609-0.5625-1.3047-0.11719-1.8633 0.19531-0.24219 0.37891-0.49219 0.55469-0.75l0.007812-0.011719c0.40234-0.59766 1.1953-0.79297 1.8281-0.44531l0.30078 0.16406c0.33984 0.1875 0.58984 0.50781 0.68359 0.88672 0.089844 0.37891 0.019531 0.78125-0.19531 1.1055zm0.83203-5.207-0.32812-0.089844h-0.003907c-0.6875-0.18359-1.125-0.85938-1.0078-1.5625 0.24219-1.4258 0.23828-2.8867-0.011719-4.3164l-0.32422-1.8711h3.1719l0.23047 1.3438c0.3125 1.7812 0.31641 3.6055 0.011719 5.3906-0.070313 0.38672-0.29688 0.72656-0.625 0.9375-0.33203 0.21094-0.73828 0.26953-1.1172 0.16797zm-37.707-11.191 3.4648-20.086h34.867l3.4609 20.086 0.003907-0.003907c0.019531 0.12109-0.074219 0.23047-0.19531 0.23047h-2.9375l-2.207-12.789c-0.14453-0.84766-0.95312-1.4219-1.8047-1.2734-0.40625 0.070312-0.76953 0.30078-1.0117 0.64062-0.23828 0.33594-0.33203 0.75781-0.26172 1.1641l2.1133 12.258h-35.297c-0.12109 0-0.21484-0.10938-0.19531-0.22656zm2.3672 64.289c0.43359-1.0977 1.4492-1.8555 2.625-1.957l12.926-1.1758h-0.003906c0.80469-0.070313 1.4219-0.74609 1.4219-1.5547v-22.988c1.0117 0.35938 2.1133 0.35938 3.125 0v22.988c0 0.80859 0.61719 1.4844 1.4219 1.5547l12.926 1.1758h-0.003906c1.1758 0.10156 2.1914 0.85938 2.625 1.957z" />
                </svg>

                <svg
                  className="hidden lg:block h-8 w-auto"
                  fill="white"
                  viewBox="0 0 100 100"
                  alt="Pyplyn logo"
                >
                  <path d="m66.191 85.555-11.504-1.043v-25.98c0.003906-1.4883 1.0547-2.7695 2.5117-3.0664 5.6641-1.1328 10.66-4.4297 13.93-9.1914 3.2656-4.7656 4.5469-10.613 3.5664-16.305l-4.4062-25.547c-0.12891-0.75-0.77734-1.2969-1.5391-1.2969h-37.5c-0.76172 0-1.4102 0.54688-1.5391 1.2969l-4.4062 25.547c-0.98047 5.6914 0.30078 11.539 3.5664 16.305 3.2695 4.7617 8.2656 8.0586 13.93 9.1914 1.457 0.29688 2.5078 1.5781 2.5117 3.0664v25.98l-11.504 1.0469v-0.003906c-3.2266 0.28125-5.6992 2.9883-5.6836 6.2266v0.40625c0 0.41406 0.16406 0.8125 0.45703 1.1055s0.69141 0.45703 1.1055 0.45703h40.625c0.41406 0 0.8125-0.16406 1.1055-0.45703s0.45703-0.69141 0.45703-1.1055v-0.40625c0.015625-3.2383-2.457-5.9453-5.6836-6.2266zm-0.21484-42.82c-0.22266 0.32812-0.46094 0.64453-0.70703 0.95312v0.003906c-0.24609 0.30469-0.60938 0.49609-1.0039 0.51953-0.39062 0.027343-0.77734-0.11719-1.0586-0.39063l-0.24609-0.23828c-0.51172-0.49609-0.5625-1.3047-0.11719-1.8633 0.19531-0.24219 0.37891-0.49219 0.55469-0.75l0.007812-0.011719c0.40234-0.59766 1.1953-0.79297 1.8281-0.44531l0.30078 0.16406c0.33984 0.1875 0.58984 0.50781 0.68359 0.88672 0.089844 0.37891 0.019531 0.78125-0.19531 1.1055zm0.83203-5.207-0.32812-0.089844h-0.003907c-0.6875-0.18359-1.125-0.85938-1.0078-1.5625 0.24219-1.4258 0.23828-2.8867-0.011719-4.3164l-0.32422-1.8711h3.1719l0.23047 1.3438c0.3125 1.7812 0.31641 3.6055 0.011719 5.3906-0.070313 0.38672-0.29688 0.72656-0.625 0.9375-0.33203 0.21094-0.73828 0.26953-1.1172 0.16797zm-37.707-11.191 3.4648-20.086h34.867l3.4609 20.086 0.003907-0.003907c0.019531 0.12109-0.074219 0.23047-0.19531 0.23047h-2.9375l-2.207-12.789c-0.14453-0.84766-0.95312-1.4219-1.8047-1.2734-0.40625 0.070312-0.76953 0.30078-1.0117 0.64062-0.23828 0.33594-0.33203 0.75781-0.26172 1.1641l2.1133 12.258h-35.297c-0.12109 0-0.21484-0.10938-0.19531-0.22656zm2.3672 64.289c0.43359-1.0977 1.4492-1.8555 2.625-1.957l12.926-1.1758h-0.003906c0.80469-0.070313 1.4219-0.74609 1.4219-1.5547v-22.988c1.0117 0.35938 2.1133 0.35938 3.125 0v22.988c0 0.80859 0.61719 1.4844 1.4219 1.5547l12.926 1.1758h-0.003906c1.1758 0.10156 2.1914 0.85938 2.625 1.957z" />
                </svg>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex">
                  <NavLink
                    to={routes.home()}
                    activeClassName="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to={routes.tweets()}
                    activeClassName="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Tweets
                  </NavLink>
                  <NavLink
                    to={routes.articles()}
                    activeClassName="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Articles
                  </NavLink>
                  <NavLink
                    to={routes.tags()}
                    activeClassName="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Tags
                  </NavLink>
                  <NavLink
                    to={routes.jobs()}
                    activeClassName="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Jobs
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                aria-label="Notifications"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <div className="ml-3 relative">
                <div>
                  <button
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                <Transition
                  show={isProfileOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                >
                  <div
                    className="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
        <Transition show={isOpen} class="px-2 pt-2 pb-3 block">
          <NavLink
            to={routes.home()}
            activeClassName="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Dashboard
          </NavLink>
          <NavLink
            to={routes.tweets()}
            activeClassName="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Tweets
          </NavLink>
          <NavLink
            to={routes.articles()}
            activeClassName="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Articles
          </NavLink>
          <NavLink
            to={routes.tags()}
            activeClassName="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Tags
          </NavLink>
          <NavLink
            to={routes.jobs()}
            activeClassName="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Jobs
          </NavLink>
        </Transition>
      </nav>
      <div className="py-1 max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

export default AppLayout
