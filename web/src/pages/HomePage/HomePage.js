import AppLayout from 'src/layouts/AppLayout'
import AreaBumpChartCell from 'src/components/AreaBumpChartCell'
import LineChartCell from 'src/components/LineChartCell'
import PeriodTotalStatsCell from 'src/components/PeriodTotalStatsCell'

const HomePage = () => {
  return (
    <AppLayout>
      <div className="mb-4">
        <div className="bg-gray-50 overflow-hidden shadow rounded-lg h-full p-8">
          <PeriodTotalStatsCell period={'month'} />
        </div>
      </div>
      <div className="mb-4">
        <div className="bg-gray-50 overflow-hidden shadow rounded-lg h-full p-8">
          <PeriodTotalStatsCell period={'week'} />
        </div>
      </div>
      <div className="mb-4">
        <div className="bg-gray-50 overflow-hidden shadow rounded-lg h-full p-8">
          <PeriodTotalStatsCell period={'day'} />
        </div>
      </div>
      <div className="h-screen mb-4">
        <div className="bg-white overflow-hidden shadow rounded-lg h-full p-8">
          <LineChartCell />
        </div>
      </div>
      <div className="h-screen mb-4">
        <div className="bg-white overflow-hidden shadow rounded-lg h-full p-8">
          <AreaBumpChartCell />
        </div>
      </div>
    </AppLayout>
  )
}

export default HomePage
