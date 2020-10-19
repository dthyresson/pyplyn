import AppLayout from 'src/layouts/AppLayout'
import TagSummariesCell from 'src/components/TagSummariesCell'
import ArticlesForTagCell from 'src/components/ArticlesForTagCell'
import TweetsForTagCell from 'src/components/TweetsForTagCell'

import { Link, routes, navigate } from '@redwoodjs/router'

const TagPage = ({ label, show = 'tweets' }) => {
  const activeClassName =
    'whitespace-no-wrap pb-4 px-1 border-b-2 border-indigo-500 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700'

  const inactiveClassName =
    'whitespace-no-wrap pb-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'

  const showTweetsClassName =
    show === 'tweets' ? activeClassName : inactiveClassName
  const showArticlesClassName =
    show === 'articles' ? activeClassName : inactiveClassName
  const showSummaryClassName =
    show === 'summary' ? activeClassName : inactiveClassName

  return (
    <AppLayout>
      <div className="mt-2 m-2 pb-5 border-b border-gray-200 space-y-3 sm:space-y-4 sm:pb-0">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="capitalize ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            {unescape(label)}
          </h3>
          <p className="ml-2 mt-1 text-sm leading-5 text-gray-500 truncate">
            seen in <span className="capitalize">{show}</span> data
          </p>
        </div>
        <div>
          <div className="sm:hidden">
            <select
              aria-label="Selected tab"
              className="form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
              onChange={(e) =>
                navigate(
                  routes.tag({
                    label: label,
                    show: e.target.value.toLowerCase(),
                  })
                )
              }
            >
              <option selected={show === 'tweets'}>Tweets</option>

              <option selected={show === 'articles'}>Articles</option>

              <option selected={show === 'summary'}>Summary</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              <Link
                to={routes.tag({ label: label, show: 'tweets' })}
                className={showTweetsClassName}
              >
                Tweets
              </Link>

              <Link
                to={routes.tag({ label: label, show: 'articles' })}
                className={showArticlesClassName}
                aria-current="page"
              >
                Articles
              </Link>

              <Link
                to={routes.tag({ label: label, show: 'summary' })}
                className={showSummaryClassName}
              >
                Summary
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {show === 'tweets' && <TweetsForTagCell label={label} />}
      {show === 'articles' && <ArticlesForTagCell label={label} />}
      {show === 'summary' && <TagSummariesCell label={label} />}
    </AppLayout>
  )
}

export default TagPage
