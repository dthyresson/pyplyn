import TagSummary from 'src/components/TagSummary'

export const beforeQuery = ({ label }) => {
  return { variables: { label } }
}

export const QUERY = gql`
  query tagSummariesForLabelQuery($label: String!) {
    tagSummaries: tagSummariesForLabel(label: $label) {
      label
      entityTypes
      totalCount
      totalMentions
      minMentions
      maxMentions
      avgMentions
      minConfidence
      maxConfidence
      avgConfidence
      minSalience
      maxSalience
      avgSalience
      minSentiment
      maxSentiment
      avgSentiment
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ tagSummaries }) => {
  return tagSummaries.map((tag) => {
    return (
      <div className="h-1/2 pb-4" key={`tag-summary-${tag}`}>
        <TagSummary tag={tag} />
      </div>
    )
  })
}
