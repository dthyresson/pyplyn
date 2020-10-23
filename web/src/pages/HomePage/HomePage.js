import { Link, routes, navigate } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'

import AreaBumpChartCell from 'src/components/AreaBumpChartCell'
import LineChartCell from 'src/components/LineChartCell'
import PeriodTotalStatsCell from 'src/components/PeriodTotalStatsCell'
import LastDurationPeriodTotalStatsCell from 'src/components/LastDurationPeriodTotalStatsCell'
import PopularTagsCell from 'src/components/PopularTagsCell'

const HomePage = ({ show = 'rankings' }) => {
  const activeClassName =
    'whitespace-no-wrap pb-4 px-1 border-b-2 border-indigo-500 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700'

  const inactiveClassName =
    'whitespace-no-wrap pb-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'

  const showRankingsClassName =
    show === 'rankings' ? activeClassName : inactiveClassName
  const showStatsClassName =
    show === 'stats' ? activeClassName : inactiveClassName
  const showMentionsClassName =
    show === 'mentions' ? activeClassName : inactiveClassName
  const showComparisonsClassName =
    show === 'comparisons' ? activeClassName : inactiveClassName

  return (
    <AppLayout>
      <div className="mt-2 m-2 pb-5 border-b border-gray-200 space-y-3 sm:space-y-4 sm:pb-0">
        <div>
          <div className="sm:hidden">
            <select
              aria-label="Selected tab"
              className="form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
              onChange={(e) =>
                navigate(
                  routes.home({
                    show: e.target.value.toLowerCase(),
                  })
                )
              }
            >
              <option defaultValue={show === 'tweets'}>Rankings</option>

              <option defaultValue={show === 'stats'}>Stats</option>

              <option defaultValue={show === 'mentions'}>Mentions</option>

              <option defaultValue={show === 'comparisons'}>Comparisons</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              <Link
                to={routes.home({ show: 'rankings' })}
                className={showRankingsClassName}
              >
                Rankings
              </Link>

              <Link
                to={routes.home({ show: 'stats' })}
                className={showStatsClassName}
              >
                Stats
              </Link>

              <Link
                to={routes.home({ show: 'mentions' })}
                className={showMentionsClassName}
              >
                Mentions
              </Link>

              <Link
                to={routes.home({ show: 'comparisons' })}
                className={showComparisonsClassName}
              >
                Comparisons
              </Link>
            </nav>
          </div>
        </div>

        {show === 'rankings' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
                Rankings
              </h2>

              <p className="max-w-4xl text-sm leading-5 text-gray-500">
                Popular people, places, events, and things mentioned together
                with wine.
              </p>
            </div>
            <div className="mb-4">
              <PopularTagsCell period="week" entityType="food" top={20} />
              <PopularTagsCell period="week" entityType="product" top={20} />
              <PopularTagsCell period="week" entityType="place" top={10} />
              <PopularTagsCell period="week" entityType="person" top={10} />
              <PopularTagsCell period="week" entityType="activity" top={10} />
              <PopularTagsCell period="week" entityType="event" top={10} />
            </div>{' '}
          </div>
        )}

        {show === 'stats' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
                Stats
              </h2>

              <p className="max-w-4xl text-sm leading-5 text-gray-500">
                Recent stats for how many tweets, articles and tags have been
                processed.
              </p>
            </div>

            <div className="mb-4">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg h-full p-8">
                <PeriodTotalStatsCell period={'day'} />
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg h-full p-8">
                <LastDurationPeriodTotalStatsCell duration={7} period={'day'} />
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg h-full p-8">
                <LastDurationPeriodTotalStatsCell
                  duration={14}
                  period={'day'}
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg h-full p-8">
                <PeriodTotalStatsCell period={'month'} />
              </div>
            </div>
          </div>
        )}

        {show === 'mentions' && (
          <div>
            <div className="mb-4 mt-8">
              <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
                Mentions
              </h2>

              <p className="max-w-4xl text-sm leading-5 text-gray-500">
                How often wine varietals are mentioned in tweets and articles.
              </p>
            </div>

            <div className="h-screen mb-4">
              <div className="bg-white overflow-hidden shadow rounded-lg h-full p-8">
                <LineChartCell />
              </div>
            </div>
          </div>
        )}

        {show === 'comparisons' && (
          <div>
            <div className="mb-4 mt-8">
              <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
                Comparisons
              </h2>

              <p className="max-w-4xl text-sm leading-5 text-gray-500">
                Compares the number of varietals mentioned.
              </p>
            </div>

            <div className="h-screen mb-4">
              <div className="bg-white overflow-hidden shadow rounded-lg h-full p-8">
                <AreaBumpChartCell />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default HomePage
