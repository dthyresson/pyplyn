const shuffleArray = (arr) => {
  return arr
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1])
}

const sample = (arr) => {
  return shuffleArray(arr).pop()
}

const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']

const randomColor = () => sample(COLORS)
const randomMessage = () =>
  sample(['loading', 'calculating', 'querying', 'fetching', 'looking up'])

const LoadingMessage = () => {
  const color = randomColor()

  return (
    <div className="overflow-hidden bg-white text-center p-4 py-12">
      <span className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className={`capitalize inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-${color}-400 hover:bg-${color}-300 focus:outline-none focus:border-${color}-500 focus:shadow-outline-${color} active:bg-${color}-500 transition ease-in-out duration-150 cursor-not-allowed`}
          disabled=""
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {randomMessage()} ...
        </button>
      </span>
    </div>
  )
}

export default LoadingMessage
