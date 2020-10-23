import TagSummary from 'src/components/TagSummary'

import EmptyMessage from 'src/components/EmptyMessage'
import FailureMessage from 'src/components/FailureMessage'
import LoadingMessage from 'src/components/LoadingMessage'

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
export const Loading = () => <LoadingMessage />

export const Empty = () => <EmptyMessage />

export const Failure = ({ error }) => <FailureMessage message={error.message} />

export const Success = ({ tagSummaries }) => {
  return (
    <div className="p-2">
      <div className="mt-2 lg:flex lg:flex-wrap">
        {tagSummaries.map((tag) => {
          return (
            <div
              className="pb-4 pr-4 lg:w-1/2"
              key={`tag-summary-${tag.label}-${tag.entityTypes}`}
            >
              <TagSummary tag={tag} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
