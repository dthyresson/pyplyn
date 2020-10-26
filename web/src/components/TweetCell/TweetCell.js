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
        entityTypes
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
  return array?.filter((el, i, a) => i === a.indexOf(el)).filter((x) => x)
}

const categoryLabels = (tweet) => {
  return sortUnique(
    tweet.categories?.map((tag) => {
      return tag.label
    }) || []
  )
}

const priorityLabels = (tweet) => {
  return sortUnique(
    tweet.priorities?.map((tag) => {
      return tag.label
    }) || []
  )
}

const tagLabels = (tweet) => {
  return sortUnique(
    tweet.tags?.map((tag) => {
      if (!tag.entityTypes?.includes('date')) {
        return tag.label
      }
    }) || []
  )
}

const articleLabels = (tweet) => {
  let labels = []

  tweet.articles.forEach((article) => {
    article.tags?.forEach((tag) => {
      if (tag.mentions && tag.mentions > 1) {
        if (!tag.entityTypes?.includes('date')) {
          labels.push(tag.label)
        }
      }
    })
  })

  return unique(labels)
}

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ tweet }) => {
  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                          <Link
                            to={routes.article({ id: article.id })}
                            className="text-blue-500 hover:text-blue-800"
                          >
                            {article.title}
                          </Link>
                          <a
                            className="text-blue-500 hover:text-blue-800"
                            href={article.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <svg
                              className="w-4 h-4 inline-flex"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
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
                        <Link
                          to={routes.priority({ label })}
                          key={`${tweet.id}-${label}-${index}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-blue-100 text-blue-800"
                        >
                          {label}
                        </Link>
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
                          <Link to={routes.tag({ label: label })}>{label}</Link>
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
                <DateDisplay date={tweet.publishedAt} />
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
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Url
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <a href={tweet.url}>{tweet.url}</a>
              </dd>
            </div>

            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Created At
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <DateDisplay date={tweet.createdAt} />
              </dd>
            </div>
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Updated At
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <DateDisplay date={tweet.updatedAt} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="p-2">
        {priorityLabels(tweet).map((label, index) => {
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
