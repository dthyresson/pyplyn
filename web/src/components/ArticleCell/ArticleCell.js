import { formatISO9075, parseISO } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'

export const beforeQuery = ({ id }) => {
  return { variables: { id } }
}

export const QUERY = gql`
  query ArticleQuery($id: String!) {
    article: articleById(id: $id) {
      id
      createdAt
      updatedAt
      title
      description
      author
      siteName
      publishedAt
      url
      sentiment

      tweets {
        id
        title
      }

      tags {
        label
      }
    }
  }
`

// const sortUnique = (array) => {
//   return array
//     ?.sort((a, b) => {
//       return a.localeCompare(b, 'en', { sensitivity: 'base' })
//     })
//     .filter((el, i, a) => i === a.indexOf(el))
// }

const unique = (array) => {
  return array?.filter((el, i, a) => i === a.indexOf(el))
}

const tagLabels = (article) => {
  return unique(
    article.tags?.map((tag) => {
      return `${tag.label} (${tag.mentions})`
    })
  )
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ article }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Article</h3>
        <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          NLP data and tags.
        </p>
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Author
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {article.author}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Title
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {article.title}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {article.description}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Tweeted From
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                {article.tweets.map((tweet, index) => {
                  return (
                    <li
                      key={`${tweet.id}-a{tweet.id}-${index}-li`}
                      className="text-sm"
                    >
                      <Link to={routes.tweet({ id: tweet.id })}>
                        {tweet.title}
                      </Link>
                      )
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>

          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Tags
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                {tagLabels(article).map((label, index) => {
                  return (
                    <li
                      key={`${article.id}-p-${label}-${index}-li`}
                      className="py-1 flex items-center justify-between text-sm leading-5"
                    >
                      <span
                        key={`${article.id}-${label}-${index}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800"
                      >
                        {label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Published At
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {article.publishedAt &&
                formatISO9075(parseISO(article.publishedAt))}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Sentiment
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {article.sentiment?.toFixed(5)}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">Url</dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <a href={article.url}>{article.url}</a>
            </dd>
          </div>

          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Created At
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {formatISO9075(parseISO(article.createdAt))}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Updated At
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {formatISO9075(parseISO(article.updatedAt))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
