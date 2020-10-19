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
  return (
    <div className="p-2">
      <div className="mt-2 lg:flex lg:flex-wrap">
        {tagSummaries.map((tag) => {
          return (
            <div className="pb-4 pr-4 lg:w-1/2" key={`tag-summary-${tag}`}>
              <TagSummary tag={tag} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
