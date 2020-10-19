import { formatRelative, parseISO } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

export const beforeQuery = ({ label }) => {
  return { variables: { label } }
}

export const QUERY = gql`
  query ArticlesForTagQuery($label: String!) {
    articles: articlesForLabel(label: $label) {
      id
      author
      siteName
      title
      publishedAt
      url

      tags {
        label
      }

      categories: articleCategories {
        id
        label
      }
    }
  }
`

const sortUnique = (array) => {
  return array
    ?.sort((a, b) => {
      return a.localeCompare(b, 'en', { sensitivity: 'base' })
    })
    .filter((el, i, a) => i === a.indexOf(el))
    .slice(0, 10)
}

const tagLabels = (article) => {
  return sortUnique(
    article.tags?.map((tag) => {
      return tag.label
    })
  )
}

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ articles }) => {
  return (
    <div className="p-2">
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          {articles?.map((article, index) => {
            const labels = tagLabels(article)

            return (
              <li
                className={index === 0 ? '' : 'border-t border-gray-200'}
                key={`article-list-${article.id}-${index}`}
              >
                <Link
                  to={routes.article({ id: article.id })}
                  className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                        {article.title}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        {article.categories.map((category, index) => {
                          return (
                            <span
                              key={`${article.id}-${category.id}-${index}`}
                              className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800"
                            >
                              {category.label}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        {article.author && article.author !== 'unknown' && (
                          <div className="mr-2 flex items-center text-sm leading-5 text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            {article.author}
                          </div>
                        )}
                        {article.siteName && (
                          <div className="mt-2 mr-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                                clipRule="evenodd"
                              ></path>{' '}
                            </svg>
                            {article.siteName}
                          </div>
                        )}
                        <div className="mt-2 mr-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formatRelative(
                            parseISO(article.publishedAt),
                            Date.now()
                          )}
                        </div>
                        {labels.length > 0 && (
                          <div className="mt-2 mr-2 flex flex-wrap items-center text-sm leading-5 text-gray-500 sm:mt-0">
                            <svg
                              className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            {labels.map((label, index) => {
                              return (
                                <span
                                  key={`${article.id}-${label}-${index}`}
                                  className="px-2 mr-1 mb-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-500 truncate"
                                >
                                  {label}
                                </span>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
