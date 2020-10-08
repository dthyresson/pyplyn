import { formatISO9075, parseISO } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'

import Pagination from 'src/components/Pagination'

export const beforeQuery = ({ page = 1, limit = 20 }) => {
  page = page ? parseInt(page, 10) : 1
  return { variables: { page: page, limit: limit } }
}

export const QUERY = gql`
  query ArticlesQuery($page: Int, $limit: Int) {
    results: paginateArticles(page: $page, limit: $limit) {
      articles {
        id
        author
        siteName
        title
        publishedAt
        url

        tags {
          label
        }
      }
      pagination {
        limit
        offset
        total
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
}

const tagLabels = (article) => {
  return sortUnique(
    article.tags?.map((tag) => {
      return tag.label
    })
  )
}

export const Loading = () => (
  <div className="overflow-hidden bg-white text-center p-4 py-12">
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150 cursor-not-allowed"
        disabled=""
      >
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading
      </button>
    </span>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ results }) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Site
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody>
                  {results?.articles?.map((article, index) => {
                    const rowColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    return (
                      <tr key={article.id} className={rowColor}>
                        <td className="px-6 py-4 w-1/4 text-sm leading-5 font-medium text-gray-900">
                          {article.title}
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500">
                          {article.author}
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500">
                          {article.siteName}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm leading-5 text-gray-500">
                          {tagLabels(article).map((label, index) => {
                            return (
                              <span
                                key={`${article.id}-${label}-${index}`}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-blue-100 text-blue-800"
                              >
                                {label}
                              </span>
                            )
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {article.publishedAt &&
                            formatISO9075(parseISO(article.publishedAt))}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          <Link
                            to={routes.article({ id: article.id })}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        paginatedRoute={routes.articles}
        offset={results?.pagination?.offset}
        total={results?.pagination?.total}
        limit={results?.pagination?.limit}
      />
    </div>
  )
}
