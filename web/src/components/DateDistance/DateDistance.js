import {
  formatDistanceToNowStrict,
  formatDistanceStrict,
  parseISO,
} from 'date-fns'

const DateDistance = ({ className = '', date, ago = false }) => {
  try {
    return (
      <time className={className}>
        {!ago && formatDistanceStrict(parseISO(date), Date.now())}
        {ago && formatDistanceToNowStrict(parseISO(date))}
      </time>
    )
  } catch (e) {
    return <time></time>
  }
}

export default DateDistance
