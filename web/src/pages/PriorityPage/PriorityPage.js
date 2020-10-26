import AppLayout from 'src/layouts/AppLayout'
import PriorityCalendarCell from 'src/components/PriorityCalendarCell'
import PriorityTermCalendarsCell from 'src/components/PriorityTermCalendarsCell'

const PriorityPage = ({ label }) => {
  return (
    <AppLayout>
      <PriorityCalendarCell label={label} />
      <PriorityTermCalendarsCell label={label} />
    </AppLayout>
  )
}

export default PriorityPage
