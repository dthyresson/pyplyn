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
                  fill="gray"
                  viewBox="0 0 100 100"
                  alt="Pyplyn logo"
                >
                  <g>
                    <path d="m62.727 50.074h20.637v21.051h-20.637z" />
                    <path d="m16.637 50.074h23.746v21.051h-23.746z" />
                    <path d="m82.109 48.613v23.977c0 2.5234 2.0469 4.5703 4.5703 4.5703 2.5234 0 4.5703-2.0469 4.5703-4.5703v-23.977c0-2.5234-2.0469-4.5703-4.5703-4.5703-2.5234 0-4.5703 2.043-4.5703 4.5703z" />
                    <path d="m8.75 48.613v23.977c0 2.5234 2.0469 4.5703 4.5703 4.5703 2.5234 0 4.5703-2.0469 4.5703-4.5703v-23.977c0-2.5234-2.0469-4.5703-4.5703-4.5703-2.5234 0-4.5703 2.043-4.5703 4.5703z" />
                    <path d="m70.148 28.363c0 1.5508-0.64844 3.0391-1.8008 4.0859-1.1367 1.0391-2.6992 1.5625-4.2266 1.4141l-8.8242-0.82422v7.9141h3.1641c0.96094 0 1.7383 0.77344 1.7383 1.7266v3.9141h0.52344c1.7891 0 3.25 1.4492 3.25 3.2383v21.551c0 1.7891-1.4609 3.2383-3.25 3.2383l-21.535-0.007813c-1.7891 0-3.2383-1.4492-3.2383-3.2383v-21.551c0-1.7891 1.4492-3.2383 3.2383-3.2383h0.61328v-3.9141c0-0.94922 0.77344-1.7266 1.7383-1.7266h3.1641v-7.9141l-8.8242 0.82422c-0.16406 0.011719-0.33594 0.023437-0.51172 0.023437-1.3633 0-2.6992-0.51172-3.7109-1.4375-1.1484-1.0508-1.8008-2.5391-1.8008-4.0859 0-1.5508 0.64844-3.0391 1.8008-4.0859 1.1484-1.0391 2.6875-1.5508 4.2266-1.4141l10.188 0.94922h7.9883l10.074-0.94922c1.5391-0.13672 3.0859 0.375 4.2266 1.4141 1.1406 1.0547 1.7891 2.543 1.7891 4.0938z" />
                  </g>
                </svg>

                <svg
                  className="hidden lg:block h-8 w-auto"
                  fill="gray"
                  viewBox="0 0 100 100"
                  alt="Pyplyn logo"
                >
                  <g>
                    <path d="m62.727 50.074h20.637v21.051h-20.637z" />
                    <path d="m16.637 50.074h23.746v21.051h-23.746z" />
                    <path d="m82.109 48.613v23.977c0 2.5234 2.0469 4.5703 4.5703 4.5703 2.5234 0 4.5703-2.0469 4.5703-4.5703v-23.977c0-2.5234-2.0469-4.5703-4.5703-4.5703-2.5234 0-4.5703 2.043-4.5703 4.5703z" />
                    <path d="m8.75 48.613v23.977c0 2.5234 2.0469 4.5703 4.5703 4.5703 2.5234 0 4.5703-2.0469 4.5703-4.5703v-23.977c0-2.5234-2.0469-4.5703-4.5703-4.5703-2.5234 0-4.5703 2.043-4.5703 4.5703z" />
                    <path d="m70.148 28.363c0 1.5508-0.64844 3.0391-1.8008 4.0859-1.1367 1.0391-2.6992 1.5625-4.2266 1.4141l-8.8242-0.82422v7.9141h3.1641c0.96094 0 1.7383 0.77344 1.7383 1.7266v3.9141h0.52344c1.7891 0 3.25 1.4492 3.25 3.2383v21.551c0 1.7891-1.4609 3.2383-3.25 3.2383l-21.535-0.007813c-1.7891 0-3.2383-1.4492-3.2383-3.2383v-21.551c0-1.7891 1.4492-3.2383 3.2383-3.2383h0.61328v-3.9141c0-0.94922 0.77344-1.7266 1.7383-1.7266h3.1641v-7.9141l-8.8242 0.82422c-0.16406 0.011719-0.33594 0.023437-0.51172 0.023437-1.3633 0-2.6992-0.51172-3.7109-1.4375-1.1484-1.0508-1.8008-2.5391-1.8008-4.0859 0-1.5508 0.64844-3.0391 1.8008-4.0859 1.1484-1.0391 2.6875-1.5508 4.2266-1.4141l10.188 0.94922h7.9883l10.074-0.94922c1.5391-0.13672 3.0859 0.375 4.2266 1.4141 1.1406 1.0547 1.7891 2.543 1.7891 4.0938z" />
                  </g>
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
            to={routes.jobs()}
            activeClassName="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Jobs
          </NavLink>
        </Transition>
      </nav>
      <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

// const AppLayout = ({ children }) => {
//   return (
//     <div className="p-4">
//       <div className="sm:hidden">
//         <select aria-label="Selected tab" className="form-select block w-full">
//           <option>Dashboard</option>
//           <option defaultValue>Tweets</option>
//         </select>
//       </div>
//       <div className="p-4 hidden sm:block">
//         <nav className="flex">
//           <NavLink
//             to={routes.home()}
//             className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
//             activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
//           >
//             Dashboard
//           </NavLink>

//           <NavLink
//             to={routes.tweets()}
//             className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
//             activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
//             aria-current="page"
//           >
//             Tweets
//           </NavLink>

//           <NavLink
//             to={routes.articles()}
//             className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
//             activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
//             aria-current="page"
//           >
//             Articles
//           </NavLink>
//           <NavLink
//             to={routes.jobs()}
//             className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
//             activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
//           >
//             Jobs
//           </NavLink>

//           <NavLink
//             to={routes.job({ name: 'process-entry-stream-job' })}
//             className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
//             activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
//           >
//             Schedule Stream
//           </NavLink>

//           <NavLink
//             to={routes.job({ name: 'load-feed-paginated' })}
//             className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
//             activeClassName="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-800 bg-gray-200 focus:outline-none focus:bg-gray-300"
//           >
//             Process Feed
//           </NavLink>
//         </nav>
//       </div>
//       <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
//     </div>
//   )
// }

export default AppLayout
