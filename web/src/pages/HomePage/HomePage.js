import AppLayout from 'src/layouts/AppLayout'
import AreaBumpChartCell from 'src/components/AreaBumpChartCell'
// import { Link, routes } from '@redwoodjs/router'

const HomePage = () => {
  return (
    <AppLayout>
      <div className="h-screen">
        <div className="bg-white overflow-hidden shadow rounded-lg h-full p-8">
          <AreaBumpChartCell></AreaBumpChartCell>
        </div>
      </div>
    </AppLayout>
  )
}

export default HomePage
