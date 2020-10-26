import { Link, routes } from '@redwoodjs/router'

import DateDisplay from 'src/components/DateDisplay'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

import PriorityCalendarCell from 'src/components/PriorityCalendarCell'
import PriorityTermCalendarsCell from 'src/components/PriorityTermCalendarsCell'

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

      summaries {
        sentenceText
        sentenceScore
        sentencePosition
      }

      tweets {
        id
        title
      }

      categories: articleCategories {
        label
      }

      priorities: articlePriorities {
        label
        terms: articlePriorityTerms {
          label
        }
      }

      tags {
        label
        mentions
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
    .filter((x) => x)
}

// const unique = (array) => {
//   return array?.filter((el, i, a) => i === a.indexOf(el)).filter((x) => x)
// }

const categoryLabels = (article) => {
  return sortUnique(
    article.categories?.map((tag) => {
      return tag.label
    }) || []
  )
}

const priorityLabels = (article) => {
  return sortUnique(
    article.priorities?.map((tag) => {
      return tag.label
    }) || []
  )
}

const tagLabels = (article) => {
  return sortUnique(
    article.tags?.map((tag) => {
      if (!tag.entityTypes?.includes('date')) {
        return tag.label
      }
    }) || []
  )
}

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ article }) => {
  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-0">
          <dl>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Title
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {article.title}
              </dd>
            </div>
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Author
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {article.author}
              </dd>
            </div>
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Site Name
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {article.siteName}
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
                Summary
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {article.summaries.map((summary) => {
                  return (
                    <p key={summary.id} className="mb-1">
                      {summary.sentenceText}
                    </p>
                  )
                })}
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
                Categories
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <ul>
                  {categoryLabels(article).map((label, index) => {
                    return (
                      <li
                        key={`${article.id}-pc${label}-${index}-li`}
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
                  {priorityLabels(article).map((label, index) => {
                    return (
                      <li
                        key={`${article.id}-p-${label}-${index}-li`}
                        className="py-1 flex items-center justify-between text-sm leading-5"
                      >
                        <Link
                          to={routes.priority({ label })}
                          key={`${article.id}-${label}-${index}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-blue-100 text-blue-800"
                        >
                          {label}
                        </Link>
                      </li>
                    )
                  })}

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
                          <Link to={routes.tag({ label: label })}>{label}</Link>
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
                <DateDisplay date={article.publishedAt} />
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
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Url
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <a href={article.url}>{article.url}</a>
              </dd>
            </div>

            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Created At
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <DateDisplay date={article.createdAt} />
              </dd>
            </div>
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Updated At
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <DateDisplay date={article.updatedAt} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="p-2">
        {priorityLabels(article).map((label, index) => {
          return (
            <div key={`${label}-${index}`}>
              <PriorityCalendarCell label={label} />
              <PriorityTermCalendarsCell label={label} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
