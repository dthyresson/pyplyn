export const jitter = ({ seconds = 30, jitter = 0.2 }) => {
  const max = seconds * (1 + jitter)
  const min = seconds * (1 - jitter)

  return seconds + Math.floor(Math.random() * (max - min)) + min
}
