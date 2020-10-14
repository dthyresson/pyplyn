const TagSummaryRow = ({ caption, content }) => {
  return (
    <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
      <dt className="text-sm leading-5 font-medium text-gray-500">{caption}</dt>
      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
        {content}
      </dd>
    </div>
  )
}

const Tag = ({ tag }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-0">
        <dl>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Label
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {tag.label}
            </dd>
          </div>
          <TagSummaryRow caption="entityTypes" content={tag.entityTypes} />
          <TagSummaryRow caption="totalCount" content={tag.totalCount} />
          <TagSummaryRow caption="totalMentions" content={tag.totalMentions} />
          <TagSummaryRow caption="minMentions" content={tag.minMentions} />
          <TagSummaryRow caption="maxMentions" content={tag.maxMentions} />
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
