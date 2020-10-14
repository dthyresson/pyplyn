const TagSummaryRow = ({ caption, content, fixed = 3 }) => {
  return (
    <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
      <dt className="text-sm leading-5 font-medium text-gray-500">{caption}</dt>
      <dd className="text-right mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
        {content.toFixed(fixed)}
      </dd>
    </div>
  )
}

const EntityTypeBadges = ({ entityTypes }) => {
  return entityTypes.map((entityType, index) => {
    return (
      <EntityTypeBadge
        key={`ta-summary-${entityType}-${index}-${entityType}`}
        entityType={entityType}
      />
    )
  })
}

const EntityTypeBadge = ({ entityType }) => {
  return (
    <span className="mr-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-pink-100 text-pink-800">
      {entityType}
    </span>
  )
}

const Tag = ({ tag }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg pr-2 mb-2">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="capitalize text-lg leading-6 font-medium text-gray-900">
          {tag.label}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          Mentioned as <EntityTypeBadges entityTypes={tag.entityTypes} />
        </p>
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl>
          <TagSummaryRow
            caption="totalCount"
            content={tag.totalCount}
            fixed={0}
          />
          <TagSummaryRow
            caption="totalMentions"
            content={tag.totalMentions}
            fixed={0}
          />
          <TagSummaryRow
            caption="minMentions"
            content={tag.minMentions}
            fixed={0}
          />
          <TagSummaryRow
            caption="maxMentions"
            content={tag.maxMentions}
            fixed={0}
          />
          <TagSummaryRow caption="avgMentions" content={tag.avgMentions} />
          <TagSummaryRow caption="minConfidence" content={tag.minConfidence} />
          <TagSummaryRow caption="maxConfidence" content={tag.maxConfidence} />
          <TagSummaryRow caption="avgConfidence" content={tag.avgConfidence} />
          <TagSummaryRow caption="minSalience" content={tag.minSalience} />
          <TagSummaryRow caption="maxSalience" content={tag.maxSalience} />
          <TagSummaryRow caption="avgSalience" content={tag.avgSalience} />
          <TagSummaryRow caption="minSentiment" content={tag.minSentiment} />
          <TagSummaryRow caption="maxSentiment" content={tag.maxSentiment} />
          <TagSummaryRow caption="avgSentiment" content={tag.avgSentiment} />
        </dl>
      </div>
    </div>
  )
}

export default Tag
