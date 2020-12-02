import { useState } from 'react'
import { Helmet } from 'react-helmet'

import { Transition } from '@tailwindui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link, NavLink, routes } from '@redwoodjs/router'

import Footer from 'src/components/Footer'
import NotificationIndicatorCell from 'src/components/NotificationIndicatorCell'

const AppLayout = ({ children }) => {
  const { isAuthenticated, logOut } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
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
                  <path d="m28.301 72c-6.9648 1.8984-11.035 9.1016-9.1328 16 1.8984 6.8984 9.0664 11.066 16.035 9.168 6.9648-1.8984 11.035-9.1016 9.1328-16-0.80078-2.9336-2.5352-5.332-4.8008-7.0352l13-25.5c1.7344 0.46484 3.6016 0.5 5.4336-0.035156 1.6328-0.43359 3.1016-1.2656 4.2656-2.332l14.168 10.102c-0.63281 1.6016-0.73438 3.4336-0.26562 5.1992 1.2344 4.5 5.8984 7.168 10.398 5.9336s7.168-5.8984 5.9336-10.398-5.8984-7.168-10.398-5.9336c-1.168 0.33203-2.2656 0.89844-3.1328 1.668l-14.133-10.133c0.93359-2.1016 1.168-4.5352 0.5-6.9336-0.19922-0.73438-0.5-1.4336-0.83203-2.1016l12.426-10.336c2.7344 2.1992 6.3984 3.1016 10.035 2.1328 5.9648-1.6328 9.5352-7.832 7.8672-13.801-1.6016-5.9648-7.8008-9.5312-13.801-7.8984s-9.5352 7.832-7.8672 13.801c0.23438 0.86719 0.56641 1.668 0.96484 2.3984l-12.43 10.402c-2.5352-1.9336-5.8984-2.7656-9.1992-1.8672-1.9336 0.53516-3.6016 1.5664-4.8672 2.9336l-14.469-8.6992c1.2344-2.9336 1.5-6.2344 0.60156-9.5352-2.1328-7.832-10.266-12.465-18.133-10.332-7.8672 2.1328-12.434 10.301-10.301 18.133 2.1328 7.832 10.266 12.465 18.133 10.332 3.0664-0.83203 5.6016-2.5664 7.4648-4.8672l14.5 8.6992c-0.66797 1.9336-0.76563 4.0664-0.19922 6.1328 0.60156 2.168 1.8672 4.0352 3.4648 5.332l-13 25.5c-2.3633-0.69531-4.8984-0.79688-7.3633-0.12891zm53.832-63.965c3.668-1 7.4336 1.1328 8.4648 4.832 1.0352 3.6992-1.1328 7.4336-4.832 8.4648-3.668 1-7.4336-1.1328-8.4648-4.832-1.0352-3.6992 1.1641-7.4648 4.832-8.4648zm-48.098 84.93c-4.6328 1.2656-9.3984-1.4648-10.633-6.0664-1.2656-4.6328 1.4648-9.3984 6.0664-10.633s9.3984 1.4648 10.633 6.0664c1.2656 4.6016-1.4336 9.3672-6.0664 10.633zm54.23-34.664c0.60156 2.168-0.69922 4.4336-2.8672 5.0352-2.168 0.60156-4.4336-0.69922-5.0352-2.8672-0.60156-2.168 0.69922-4.4336 2.8672-5.0352 2.168-0.60156 4.4375 0.69922 5.0352 2.8672zm-34.664-25.566c3.2344-0.86719 6.5664 1.0352 7.4336 4.2344 0.86719 3.1992-1.0352 6.5664-4.2344 7.4336-3.2344 0.86719-6.5664-1.0352-7.4336-4.2344-0.86719-3.2031 1.0312-6.5352 4.2344-7.4336zm-44.102-12.867c-1.5352-5.5352 1.7344-11.266 7.2656-12.766 5.5352-1.5 11.234 1.7656 12.77 7.2656s-1.7656 11.234-7.2656 12.766c-5.5352 1.5-11.27-1.7656-12.77-7.2656z" />

                  <path
                    d="m33.023 4.6875c-7.3281-0.26172-14.746 2.4023-20.332 7.9883-9.9219 9.9219-10.621 25.621-2.0781 36.355 0.21875 0.28516 0.33203 0.61719 0.33594 0.94922-0.003907 0.33203-0.11719 0.66406-0.33594 0.94922-8.543 10.734-7.8438 26.434 2.0781 36.355 9.9297 9.9297 25.645 10.625 36.379 2.0586 0.28125-0.21484 0.60547-0.30078 0.92969-0.30078 0.33203 0.003906 0.66406 0.10156 0.95312 0.32031 10.73 8.543 26.391 7.8438 36.309-2.0781 9.9141-9.9141 10.645-25.621 2.1211-36.355-0.21875-0.28516-0.33203-0.61719-0.33594-0.94922 0.003906-0.33203 0.11719-0.66406 0.33594-0.94922 8.5234-10.734 7.793-26.441-2.1211-36.355-9.9219-9.9219-25.578-10.621-36.309-2.0781-0.29297 0.21875-0.625 0.31641-0.95703 0.32031-0.32422 0.003906-0.64844-0.085938-0.92969-0.30078-4.6953-3.75-10.344-5.7266-16.047-5.9297z"
                    fillRule="evenodd"
                  />
                </svg>

                <svg
                  className="hidden lg:block h-8 w-auto"
                  fill="white"
                  viewBox="0 0 100 100"
                  alt="Pyplyn logo"
                >
                  <path
                    d="m33.023 4.6875c-7.3281-0.26172-14.746 2.4023-20.332 7.9883-9.9219 9.9219-10.621 25.621-2.0781 36.355 0.21875 0.28516 0.33203 0.61719 0.33594 0.94922-0.003907 0.33203-0.11719 0.66406-0.33594 0.94922-8.543 10.734-7.8438 26.434 2.0781 36.355 9.9297 9.9297 25.645 10.625 36.379 2.0586 0.28125-0.21484 0.60547-0.30078 0.92969-0.30078 0.33203 0.003906 0.66406 0.10156 0.95312 0.32031 10.73 8.543 26.391 7.8438 36.309-2.0781 9.9141-9.9141 10.645-25.621 2.1211-36.355-0.21875-0.28516-0.33203-0.61719-0.33594-0.94922 0.003906-0.33203 0.11719-0.66406 0.33594-0.94922 8.5234-10.734 7.793-26.441-2.1211-36.355-9.9219-9.9219-25.578-10.621-36.309-2.0781-0.29297 0.21875-0.625 0.31641-0.95703 0.32031-0.32422 0.003906-0.64844-0.085938-0.92969-0.30078-4.6953-3.75-10.344-5.7266-16.047-5.9297z"
                    fillRule="evenodd"
                  />
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
                  {isAuthenticated && (
                    <NavLink
                      to={routes.jobs()}
                      activeClassName="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                      className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                    >
                      Jobs
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            {isAuthenticated && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NotificationIndicatorCell />
                <div className="ml-3 relative">
                  <div>
                    <button
                      className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <svg
                        fill="currentColor"
                        className="h-8 w-8 rounded-full bg-gray-50 p-1"
                        version="1.1"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="m81.238 47.172c4 0 7.25-3.3203 7.25-7.4102v-8.6094c3.7305-0.92969 6.5117-4.3711 6.5117-8.4688 0-2.9297-1.4297-5.6406-3.8398-7.2617l-2.2305 3.3281c1.2891 0.87109 2.0586 2.3398 2.0586 3.9297 0 2.6016-2.0195 4.7109-4.5 4.7109-2.4883 0-4.5117-2.1094-4.5117-4.7109 0-1.5898 0.76953-3.0586 2.0586-3.9297l-2.2383-3.3281c-2.3984 1.6211-3.8281 4.3281-3.8281 7.2617 0 4.1016 2.7812 7.5391 6.5117 8.4688v8.6094c0 1.8711-1.4492 3.3984-3.2383 3.3984h-6.7305v-19.719c0-4.3516-3.5508-7.8906-7.8984-7.8906h-33.234c-4.3516 0-7.8906 3.5391-7.8906 7.8906v19.719h-6.7305c-1.7891 0-3.2383-1.5312-3.2383-3.3984v-8.6094c3.7305-0.92969 6.5117-4.3711 6.5117-8.4688 0-2.9297-1.4297-5.6406-3.8281-7.2617l-2.2383 3.3281c1.2891 0.87109 2.0586 2.3398 2.0586 3.9297 0 2.6016-2.0195 4.7109-4.5117 4.7109-2.4805 0-4.5-2.1094-4.5-4.7109 0-1.5898 0.76953-3.0586 2.0586-3.9297l-2.2305-3.3281c-2.4102 1.6172-3.8398 4.3281-3.8398 7.2578 0 4.1016 2.7812 7.5391 6.5117 8.4688v8.6094c0 4.0898 3.25 7.4102 7.25 7.4102h6.7305v8.7891h-4.1094c-6.5117 0-11.809 5.3008-11.809 11.82v4.9805c0 6.5195 5.3008 11.82 11.809 11.82h57.238c6.5117 0 11.809-5.3008 11.809-11.82v-4.9805c0-6.5195-5.3008-11.82-11.809-11.82h-4.1094v-8.7891zm-18.859 27.109h-24.25c-0.089844-0.48828-0.14062-1-0.14062-1.5195v-4.9805c0-0.51953 0.050781-1.0195 0.14062-1.5195h24.25c-0.058594 0.5-0.10938 1-0.10938 1.5195v4.9805c0 0.51953 0.050781 1.0195 0.10938 1.5195zm-23.359-10.652c1.1992-2.2891 3.3594-3.9883 5.9414-4.5781h21.301c-1.4102 1.2383-2.5195 2.8008-3.2109 4.5781zm-10.441-40.188c0-2.6484 2.1602-4.8008 4.8008-4.8008h28.988c-0.089844 0.10938-0.17969 0.23047-0.26953 0.33984-1.4492 1.4297-2.3398 3.4102-2.3398 5.6016v31.379h-31.18zm-7.1992 35.609h17.969c-1.4219 1.2383-2.5195 2.8008-3.2109 4.5781h-22.426c1.4805-2.7188 4.3594-4.5781 7.668-4.5781zm-8.5781 15.23c-0.089843-0.48828-0.14062-1-0.14062-1.5195v-4.9805c0-0.55078 0.058594-1.0898 0.14844-1.6094 0.14844 0.058594 0.32031 0.089844 0.48828 0.089844h22.172c-0.070312 0.5-0.10938 1-0.10938 1.5195v4.9805c0 0.51953 0.039063 1.0195 0.10938 1.5195zm8.5781 7.207c-3.3086 0-6.1914-1.8594-7.6719-4.5781h22.43c0.69141 1.7812 1.7891 3.3516 3.2109 4.5781zm23.582 0c-2.5781-0.58984-4.7383-2.2891-5.9414-4.5781h24.031c0.69141 1.7812 1.7891 3.3516 3.2109 4.5781zm33.66-22.438c4.8086 0 8.7188 3.9219 8.7188 8.7305v4.9805c0 4.8086-3.9102 8.7305-8.7188 8.7305h-6.75c-3-0.67969-5.4297-2.8789-6.4492-5.75 0.011719-0.050782-0.10156-0.75-0.28125-0.96875-0.14844-0.64844-0.23828-1.3203-0.23828-2.0117v-4.9805c0-0.60938 0.058594-1.2109 0.17969-1.7891 0.17969-0.82813 0.48828-1.3398 0.44922-1.4805 1.0703-2.7188 3.4414-4.8008 6.3398-5.4609z" />
                          <path d="m51.285 29.098h-16.668c-1.9375 0-3.5156 1.5781-3.5156 3.5156v10.559c0 1.9375 1.5781 3.5156 3.5156 3.5156h16.668c1.9375 0 3.5156-1.5781 3.5156-3.5156v-10.559c0-1.9375-1.5781-3.5156-3.5156-3.5156zm-10.227 11.957c0 0.92578-0.75781 1.6797-1.6797 1.6797h-0.85938c-0.92578 0-1.6797-0.75781-1.6797-1.6797v-6.3281c0-0.92578 0.75781-1.6797 1.6797-1.6797h0.85938c0.92578 0 1.6797 0.75781 1.6797 1.6797zm8.0117 0c0 0.92578-0.75781 1.6797-1.6797 1.6797h-0.85938c-0.92578 0-1.6797-0.75781-1.6797-1.6797v-6.3281c0-0.92578 0.75781-1.6797 1.6797-1.6797h0.85938c0.92578 0 1.6797 0.75781 1.6797 1.6797z" />
                          <path d="m84.25 70.27c0 4.1875-3.3945 7.582-7.5781 7.582-4.1875 0-7.582-3.3945-7.582-7.582 0-4.1836 3.3945-7.5781 7.582-7.5781 4.1836 0 7.5781 3.3945 7.5781 7.5781" />
                        </g>
                      </svg>
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
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50"
                  >
                    {isAuthenticated && (
                      <div
                        className="py-1 rounded-md bg-white shadow-xs"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <Link
                          to={routes.profile()}
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                          role="menuitem"
                        >
                          Your Profile
                        </Link>
                        <Link
                          to={routes.settings()}
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                          role="menuitem"
                        >
                          Settings
                        </Link>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                          role="menuitem"
                          onClick={async () => {
                            await logOut()
                          }}
                        >
                          Sign Out
                        </a>
                      </div>
                    )}
                  </Transition>
                </div>
              </div>
            )}
            {!isAuthenticated && (
              <div className="flex-shrink-0">
                <span className="rounded-md shadow-sm">
                  <Link
                    to={routes.signIn()}
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-500 hover:bg-teal-400 focus:outline-none focus:shadow-outline-teal focus:border-teal-600 active:bg-teal-600 transition duration-150 ease-in-out"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    <span>Sign In</span>
                  </Link>
                </span>
              </div>
            )}
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
          {isAuthenticated && (
            <NavLink
              to={routes.jobs()}
              activeClassName="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            >
              Jobs
            </NavLink>
          )}
        </Transition>
      </nav>
      <div className="py-2 px-2 max-w-7xl mx-auto sm:px-6 lg:px-8 sm:py-2 lg:py-4">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout
