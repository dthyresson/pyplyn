import AppLayout from 'src/layouts/AppLayout'
import AreaBumpChartCell from 'src/components/AreaBumpChartCell'
import LineChartCell from 'src/components/LineChartCell'
import PeriodTotalStatsCell from 'src/components/PeriodTotalStatsCell'
import LastDurationPeriodTotalStatsCell from 'src/components/LastDurationPeriodTotalStatsCell'
import PopularTagsCell from 'src/components/PopularTagsCell'

const HomePage = () => {
  return (
    <AppLayout>
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
            Rankings
          </h2>

          <p className="max-w-4xl text-sm leading-5 text-gray-500">
            Popular people, places, events, and things mentioned together with
            wine.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap">
          <PopularTagsCell period="week" entityType="food" top={20} />
          <PopularTagsCell period="week" entityType="product" top={20} />
          <PopularTagsCell period="week" entityType="place" top={10} />
          <PopularTagsCell period="week" entityType="person" top={10} />
          <PopularTagsCell period="week" entityType="activity" top={10} />
          <PopularTagsCell period="week" entityType="event" top={10} />
        </div>

        <div className="mb-4">
          <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
            Overview
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
            <LastDurationPeriodTotalStatsCell duration={14} period={'day'} />
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-gray-50 overflow-hidden shadow rounded-lg h-full p-8">
            <PeriodTotalStatsCell period={'month'} />
          </div>
        </div>

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

        <div className="mb-4 mt-8">
          <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
            Comparison
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
    </AppLayout>
  )
}

export default HomePage
