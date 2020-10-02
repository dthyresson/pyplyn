import AppLayout from 'src/layouts/AppLayout'
import AreaBumpChartCell from 'src/components/AreaBumpChartCell'
import LineChartCell from 'src/components/LineChartCell'

const HomePage = () => {
  return (
    <AppLayout>
      <div className="h-screen">
        <div className="bg-white overflow-hidden shadow rounded-lg h-full p-8">
          <LineChartCell />
        </div>
      </div>
      <div className="h-screen">
        <div className="bg-white overflow-hidden shadow rounded-lg h-full p-8">
          <AreaBumpChartCell />
        </div>
      </div>
    </AppLayout>
  )
}

export default HomePage
