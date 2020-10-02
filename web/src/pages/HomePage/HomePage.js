import AppLayout from 'src/layouts/AppLayout'
import AreaBumpChartCell from 'src/components/AreaBumpChartCell'
// import { Link, routes } from '@redwoodjs/router'

const HomePage = () => {
  return (
    <AppLayout>
      <div className="h-screen">
        <AreaBumpChartCell></AreaBumpChartCell>
      </div>
    </AppLayout>
  )
}

export default HomePage
