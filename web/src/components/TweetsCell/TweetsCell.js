import { routes } from '@redwoodjs/router'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

import TweetListItem from 'src/components/TweetListItem'
import Pagination from 'src/components/Pagination'

export const beforeQuery = ({ page = 1, limit = 20 }) => {
  page = page ? parseInt(page, 10) : 1
  return { variables: { page: page, limit: limit } }
}

export const QUERY = gql`
  query TweetsQuery($page: Int, $limit: Int) {
    results: paginateTweets(page: $page, limit: $limit) {
      tweets {
        id
        entryId
        title
        content
        author
        publishedAt

        articles {
          id
          title
          url
        }

        categories: tweetCategories {
          id
          label
        }

        priorities: tweetPriorities {
          id
          label
          terms: tweetPriorityTerms {
            id
            label
          }
        }

        tags {
          id
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

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ results }) => {
  return (
    <div className="p-2">
      <div className="pb-5 border-b border-gray-200">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            Tweets
          </h3>
          <p className="ml-2 mt-1 text-sm leading-5 text-gray-500 truncate">
            related to Wine Trends
          </p>
        </div>
      </div>
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          {results?.tweets?.map((tweet, index) => {
            return (
              <TweetListItem
                key={`tweet-lists-${tweet.id}-${index}`}
                tweet={tweet}
                index={index}
              />
            )
          })}
        </ul>
      </div>
      <Pagination
        paginatedRoute={routes.tweets}
        offset={results?.pagination?.offset}
        total={results?.pagination?.total}
        limit={results?.pagination?.limit}
      />
    </div>
  )
}
