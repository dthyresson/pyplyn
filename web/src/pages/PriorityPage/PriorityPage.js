import AppLayout from 'src/layouts/AppLayout'
import PriorityCalendarCell from 'src/components/PriorityCalendarCell'

const PriorityPage = ({ label }) => {
  return (
    <AppLayout>
      <PriorityCalendarCell label={label} />
    </AppLayout>
  )
}

export default PriorityPage
