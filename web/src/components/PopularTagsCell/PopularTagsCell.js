export const beforeQuery = ({
  entityType = 'food',
  period = 'month',
  top = 10,
  score = 0.8,
}) => {
  return { variables: { entityType, period, top, score } }
}

export const QUERY = gql`
  query popularTagsQuery(
    $entityType: String
    $period: String
    $top: Int
    $score: Float
  ) {
    popularTags(
      entityType: $entityType
      period: $period
      top: $top
      score: $score
    ) {
      entityType
      top
      period
      score
      date
      label
      total
      previousTotal
      delta
      deltaDirection
      pctChange
      ranking
      rankingPctChange
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ popularTags }) => {
  const { entityType, period, top } = { ...popularTags[0] }
  return (
    <div>
      <h3>
        Top {top} {entityType} - {period}
      </h3>
      <ul>
        {popularTags.map((ranking, index) => {
          return (
            <li key={`tag-${ranking.label}-${ranking.label}-${index}`}>
              <span className="p-2">{ranking.ranking}</span>
              <span className="p-2">{ranking.label}</span>
              <span className="p-2">({ranking.total})</span>
              <span className="p-2">{ranking.delta}</span>
              <span className="p-2">{ranking.deltaDirection}</span>
              <span className="p-2">{ranking.pctChange}%</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
