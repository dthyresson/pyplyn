export const schema = gql`
  type CalendarDayTotal {
    day: Date!
    value: Int!
  }

  type PriorityTermCalendar {
    label: String!
    calendar: [CalendarDayTotal!]!
  }

  type PriorityCalendar {
    label: String!
    calendar: [CalendarDayTotal!]!
  }

  type Query {
    priorityCalendar(label: String!): PriorityCalendar!
    priorityCalendars: [PriorityCalendar!]!
    priorityTermCalendar(label: String!): PriorityTermCalendar!
    priorityTermCalendars: [PriorityTermCalendar!]!
  }
`
