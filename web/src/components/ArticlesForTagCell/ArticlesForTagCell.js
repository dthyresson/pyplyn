import { formatDistanceToNowStrict, parseISO } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'

export const beforeQuery = ({ label }) => {
  return { variables: { label } }
}

export const QUERY = gql`
  query ArticlesForTagQuery($label: String!) {
    articles: articlesForLabel(label: $label) {
      id
      description
      publishedAt
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ articles }) => {
  return (
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
      <div>Articles</div>
      <ul>
        {articles.map((article) => {
          return (
            <li
              key={`article-simple-${article.id}`}
              className="text-sm px-2 py-2 pl-0"
            >
              <Link to={routes.article({ id: article.id })}>
                <p>{article.title}</p>
                <p className="text-gray-700 text-xs">{article.description}</p>
                <time className="text-xs text-gray-500 pr-1 pt-1 block">
                  {formatDistanceToNowStrict(parseISO(article.publishedAt))}
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
