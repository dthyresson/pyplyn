import { formatISO9075, parseISO, formatRelative } from 'date-fns'

const DateDisplay = ({ className = '', date, relative = false }) => {
  try {
    return (
      <time className={className}>
        {!relative && formatISO9075(parseISO(date))}
        {relative && formatRelative(parseISO(date), Date.now())}
      </time>
    )
  } catch (e) {
    return <time></time>
  }
}

export default DateDisplay
