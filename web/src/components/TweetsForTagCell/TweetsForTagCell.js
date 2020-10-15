import { formatDistanceToNowStrict, parseISO } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'

export const beforeQuery = ({ label }) => {
  return { variables: { label } }
}

export const QUERY = gql`
  query TweetsForTagQuery($label: String!) {
    tweets: tweetsForLabel(label: $label) {
      id
      publishedAt
      author
      title
      entryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ tweets }) => {
  return (
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6 mr-2">
      <div>Tweets</div>
      <ul>
        {tweets.map((tweet) => {
          return (
            <li
              key={`tweet-simple-${tweet.id}`}
              className="text-sm px-2 py-2 pl-0"
            >
              <Link to={routes.tweet({ id: tweet.id })}>
                <p>{tweet.title}</p>
                <p className="text-gray-700 text-xs">{tweet.author}</p>
                <time className="text-xs text-gray-500 pr-1 pt-1 block">
                  {formatDistanceToNowStrict(parseISO(tweet.publishedAt))}
                  <span className="px-1">ago</span>
                </time>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
