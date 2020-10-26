import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

import CalendarChart from 'src/components/CalendarChart'

export const beforeQuery = ({ label }) => {
  return { variables: { label } }
}

export const QUERY = gql`
  query PriorityCalendarQuery($label: String!) {
    priorityTermCalendars(label: $label) {
      label
      calendar {
        day
        value
      }
    }
  }
`

export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ priorityTermCalendars }) => {
  return priorityTermCalendars.map((calendar) => {
    return <CalendarChart key={calendar.label} calendar={calendar} />
  })
}
