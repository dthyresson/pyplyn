import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'

const SignUp = () => {
  const { isAuthenticated, signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <svg className="mx-auto h-12 w-auto" viewBox="0 0 100 100" alt="Pyplyn">
          <path d="m28.301 72c-6.9648 1.8984-11.035 9.1016-9.1328 16 1.8984 6.8984 9.0664 11.066 16.035 9.168 6.9648-1.8984 11.035-9.1016 9.1328-16-0.80078-2.9336-2.5352-5.332-4.8008-7.0352l13-25.5c1.7344 0.46484 3.6016 0.5 5.4336-0.035156 1.6328-0.43359 3.1016-1.2656 4.2656-2.332l14.168 10.102c-0.63281 1.6016-0.73438 3.4336-0.26562 5.1992 1.2344 4.5 5.8984 7.168 10.398 5.9336s7.168-5.8984 5.9336-10.398-5.8984-7.168-10.398-5.9336c-1.168 0.33203-2.2656 0.89844-3.1328 1.668l-14.133-10.133c0.93359-2.1016 1.168-4.5352 0.5-6.9336-0.19922-0.73438-0.5-1.4336-0.83203-2.1016l12.426-10.336c2.7344 2.1992 6.3984 3.1016 10.035 2.1328 5.9648-1.6328 9.5352-7.832 7.8672-13.801-1.6016-5.9648-7.8008-9.5312-13.801-7.8984s-9.5352 7.832-7.8672 13.801c0.23438 0.86719 0.56641 1.668 0.96484 2.3984l-12.43 10.402c-2.5352-1.9336-5.8984-2.7656-9.1992-1.8672-1.9336 0.53516-3.6016 1.5664-4.8672 2.9336l-14.469-8.6992c1.2344-2.9336 1.5-6.2344 0.60156-9.5352-2.1328-7.832-10.266-12.465-18.133-10.332-7.8672 2.1328-12.434 10.301-10.301 18.133 2.1328 7.832 10.266 12.465 18.133 10.332 3.0664-0.83203 5.6016-2.5664 7.4648-4.8672l14.5 8.6992c-0.66797 1.9336-0.76563 4.0664-0.19922 6.1328 0.60156 2.168 1.8672 4.0352 3.4648 5.332l-13 25.5c-2.3633-0.69531-4.8984-0.79688-7.3633-0.12891zm53.832-63.965c3.668-1 7.4336 1.1328 8.4648 4.832 1.0352 3.6992-1.1328 7.4336-4.832 8.4648-3.668 1-7.4336-1.1328-8.4648-4.832-1.0352-3.6992 1.1641-7.4648 4.832-8.4648zm-48.098 84.93c-4.6328 1.2656-9.3984-1.4648-10.633-6.0664-1.2656-4.6328 1.4648-9.3984 6.0664-10.633s9.3984 1.4648 10.633 6.0664c1.2656 4.6016-1.4336 9.3672-6.0664 10.633zm54.23-34.664c0.60156 2.168-0.69922 4.4336-2.8672 5.0352-2.168 0.60156-4.4336-0.69922-5.0352-2.8672-0.60156-2.168 0.69922-4.4336 2.8672-5.0352 2.168-0.60156 4.4375 0.69922 5.0352 2.8672zm-34.664-25.566c3.2344-0.86719 6.5664 1.0352 7.4336 4.2344 0.86719 3.1992-1.0352 6.5664-4.2344 7.4336-3.2344 0.86719-6.5664-1.0352-7.4336-4.2344-0.86719-3.2031 1.0312-6.5352 4.2344-7.4336zm-44.102-12.867c-1.5352-5.5352 1.7344-11.266 7.2656-12.766 5.5352-1.5 11.234 1.7656 12.77 7.2656s-1.7656 11.234-7.2656 12.766c-5.5352 1.5-11.27-1.7656-12.77-7.2656z" />
        </svg>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
          Or
          <Link
            className="pl-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            to={routes.login()}
          >
            Sign In
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  disabled={
                    (!email.length || !password.length) && !isAuthenticated
                  }
                  onClick={async () => {
                    if (isAuthenticated) {
                      navigate(routes.home())
                    } else if (email.length && password.length) {
                      try {
                        event.preventDefault()
                        await signUp({ email, password })
                        navigate(routes.home())
                      } catch (e) {
                        resetForm()
                        console.log(e)
                        const supabaseError = JSON.parse(e.message)
                        alert(supabaseError.error_description)
                      }
                    }
                  }}
                >
                  Sign Up
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
