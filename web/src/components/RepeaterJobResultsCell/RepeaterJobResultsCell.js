import { formatDistanceToNowStrict, formatISO9075, parseISO } from 'date-fns'

export const QUERY = gql`
  query RepeaterJobResultsQuery($name: String!) {
    repeaterJobResults(name: $name) {
      status
      duration
      run
      runAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ repeaterJobResults }) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Run At
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Run
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Ago
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {repeaterJobResults?.map((result, index) => {
                    const rowColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    let color = 'green'
                    switch (Math.floor(result.status / 100)) {
                      case 2:
                        color = 'green'
                        break
                      case 3:
                        color = 'teal'
                        break
                      case 4:
                        color = 'orange'
                        break
                      case 5:
                        color = 'red'
                        break
                      default:
                        color = 'green'
                    }

                    return (
                      <tr
                        key={`job-result-run-${result.run}`}
                        className={rowColor}
                      >
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {formatISO9075(parseISO(result.runAt))}
                        </td>
                        <td className="text-right px-6 py-4 whitespace-normal text-sm leading-5 text-gray-500">
                          {result.run}
                        </td>
                        <td className="text-right px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {formatDistanceToNowStrict(parseISO(result.runAt))}
                        </td>
                        <td className="text-right px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {result.duration}
                        </td>
                        <td className="text-right px-6 py-4 text-sm leading-5 font-medium text-gray-900">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-${color}-100 text-${color}-800`}
                          >
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
