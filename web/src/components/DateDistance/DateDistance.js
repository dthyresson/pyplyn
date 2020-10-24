import {
  formatDistanceToNowStrict,
  formatDistanceStrict,
  parseISO,
} from 'date-fns'

const DateDistance = ({ className = '', date, ago = false }) => {
  try {
    if (ago) {
      return (
        <time className={className}>
          {formatDistanceToNowStrict(parseISO(date))} ago
        </time>
      )
    } else {
      return (
        <time className={className}>
          {formatDistanceStrict(parseISO(date), Date.now())}
        </time>
      )
    }
  } catch (e) {
    return <time></time>
  }
}

export default DateDistance
