// import { Link, routes } from '@redwoodjs/router'
import AppLayout from 'src/layouts/AppLayout'
import RepeaterJobCell from 'src/components/RepeaterJobCell'
import RepeaterJobResultsCell from 'src/components/RepeaterJobResultsCell'
import RepeaterJobChartCell from 'src/components/RepeaterJobChartCell'

const RepeaterJobPage = ({ name }) => {
  console.log(name)
  return (
    <AppLayout>
      <RepeaterJobCell name={name} />
      <RepeaterJobChartCell name={name} />
      <RepeaterJobResultsCell name={name} />
    </AppLayout>
  )
}

export default RepeaterJobPage
