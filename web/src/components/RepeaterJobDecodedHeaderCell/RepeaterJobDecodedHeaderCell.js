import DateDisplay from 'src/components/DateDisplay'

export const beforeQuery = ({ name }) => {
  return { variables: { name } }
}

export const QUERY = gql`
  query RepeaterJobDecodedHeaderQuery($name: String!) {
    repeaterJobDecodedHeader(name: $name) {
      decodedToken
      issuedAt
      expiresIn
      subject
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ _name, repeaterJobDecodedHeader }) => {
  return (
    <>
      <div className="sm:col-span-1">
        <dt className="text-sm leading-5 font-medium text-gray-500">
          Authorization
        </dt>
        <dd className="mt-1 leading-5 text-gray-700">
          {repeaterJobDecodedHeader?.subject}
        </dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm leading-5 font-medium text-gray-500">
          Issued At
        </dt>
        <dd className="mt-1 leading-5 text-gray-700">
          <DateDisplay date={repeaterJobDecodedHeader?.issuedAt} />
        </dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm leading-5 font-medium text-gray-500">
          Expires On
        </dt>
        <dd className="mt-1 leading-5 text-gray-700">
          <DateDisplay date={repeaterJobDecodedHeader?.expiresIn} />
        </dd>
      </div>
    </>
  )
}
