// import { Link, routes } from '@redwoodjs/router'
import AppLayout from 'src/layouts/AppLayout'
import RepeaterJobCell from 'src/components/RepeaterJobCell'
import RepeaterJobChartCell from 'src/components/RepeaterJobChartCell'
import RepeaterJobResultsCell from 'src/components/RepeaterJobResultsCell'

const RepeaterJobPage = ({ name }) => {
  return (
    <AppLayout>
      <RepeaterJobCell name={name} />
      <RepeaterJobChartCell name={name} />
      <RepeaterJobResultsCell name={name} />
    </AppLayout>
  )
}

export default RepeaterJobPage
