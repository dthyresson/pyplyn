import { formatISO9075, parseISO } from 'date-fns'

export const beforeQuery = ({ id }) => {
  return { variables: { id } }
}

export const QUERY = gql`
  query TweetQuery($id: String!) {
    tweet: tweetById(id: $id) {
      id
      createdAt
      updatedAt
      publishedAt
      author
      title
      content
      sentiment
      url

      articles {
        id
        title
        description
        url
        tags {
          label
          mentions
          confidence
          salience
          sentiment
        }
      }

      categories: tweetCategories {
        label
      }

      priorities: tweetPriorities {
        label
        terms: tweetPriorityTerms {
          label
        }
      }

      tags {
        label
        mentions
        confidence
        salience
        sentiment
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

const unique = (array) => {
  return array?.filter((el, i, a) => i === a.indexOf(el))
}

const categoryLabels = (tweet) => {
  return sortUnique(
    tweet.categories?.map((tag) => {
      return tag.label
    })
  )
}

const priorityLabels = (tweet) => {
  return sortUnique(
    tweet.priorities?.map((tag) => {
      return tag.label
    })
  )
}

const tagLabels = (tweet) => {
  return unique(
    tweet.tags?.map((tag) => {
      return `${tag.label} (${tag.mentions})`
    })
  )
}

const articleLabels = (tweet) => {
  let labels = []

  tweet.articles.forEach((article) => {
    article.tags?.forEach((tag) => {
      labels.push(`${tag.label} (${tag.mentions})`)
    })
  })

  return unique(labels)
}

export const Loading = () => (
  <div className="overflow-hidden bg-white text-center p-4 py-12">
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150 cursor-not-allowed"
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

export const Success = ({ tweet }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Tweet</h3>
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
              {tweet.author}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Title
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {tweet.title}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Content
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {tweet.content}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Articles Mentioned
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                {tweet.articles.map((article, index) => {
                  return (
                    <li
                      key={`${tweet.id}-a{article.id}-${index}-li`}
                      className="text-sm"
                    >
                      <p>
                        <a
                          className="text-blue-500 hover:text-blue-800"
                          href={article.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {article.title}
                        </a>
                      </p>
                      <p>{article.description}</p>
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Categories
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                {categoryLabels(tweet).map((label, index) => {
                  return (
                    <li
                      key={`${tweet.id}-pc${label}-${index}-li`}
                      className="py-1 flex items-center justify-between text-sm leading-5"
                    >
                      {label}
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Priorities and Tags
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                {priorityLabels(tweet).map((label, index) => {
                  return (
                    <li
                      key={`${tweet.id}-p-${label}-${index}-li`}
                      className="py-1 flex items-center justify-between text-sm leading-5"
                    >
                      <span
                        key={`${tweet.id}-${label}-${index}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-blue-100 text-blue-800"
                      >
                        {label}
                      </span>
                    </li>
                  )
                })}
                {tagLabels(tweet).map((label, index) => {
                  return (
                    <li
                      key={`${tweet.id}-p-${label}-${index}-li`}
                      className="py-1 flex items-center justify-between text-sm leading-5"
                    >
                      <span
                        key={`${tweet.id}-${label}-${index}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800"
                      >
                        {label}
                      </span>
                    </li>
                  )
                })}
                {articleLabels(tweet).map((label, index) => {
                  return (
                    <li
                      key={`${tweet.id}-art-li-${label}-${index}-li`}
                      className="py-1 flex items-center justify-between text-sm leading-5"
                    >
                      <span
                        key={`${tweet.id}-art-${label}-${index}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-teal-100 text-teal-800"
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
              {formatISO9075(parseISO(tweet.publishedAt))}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Sentiment
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {tweet.sentiment?.toFixed(5)}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">Url</dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <a href={tweet.url}>{tweet.url}</a>
            </dd>
          </div>

          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Created At
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {formatISO9075(parseISO(tweet.createdAt))}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Updated At
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {formatISO9075(parseISO(tweet.updatedAt))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
