import { db } from 'src/lib/db'

const TAG_SUMMARY_SQL = `
  SELECT
    label,
    "entityTypes",
    count(label) AS "totalCount",
    sum(mentions) AS "totalMentions",
    avg(mentions) AS "avgMentions",
    min(mentions) AS "minMentions",
    max(mentions) AS "maxMentions",
    avg(confidence) AS "avgConfidence",
    min(confidence) AS "minConfidence",
    max(confidence) AS "maxConfidence",
    avg(salience) AS "avgSalience",
    min(salience) AS "minSalience",
    max(salience) AS "maxSalience",
    avg(sentiment) AS "avgSentiment",
    min(sentiment) AS "minSentiment",
    max(sentiment) AS "maxSentiment"
  FROM
    "Tag" t
  WHERE
    NOT('date' = ANY ("entityTypes"))
  GROUP BY
    1,
    2
  ORDER BY
    4 DESC,
    1
`

export const tagSummaries = async () => {
  const summary = await db.$queryRaw(TAG_SUMMARY_SQL)
  return summary
}

export const tagTotals = async () => {
  const total = await db.$queryRaw(
    'SELECT count(distinct t.label) as total FROM "Tag" t'
  )

  return total[0]
}

export const paginateTagSummaries = async ({ page = 1, limit = 20 }) => {
  page = page < 1 ? 1 : page

  const offset = (page - 1) * limit

  const total = await tagTotals()

  const tagSummaries = await db.$queryRaw(
    `${TAG_SUMMARY_SQL} LIMIT ${limit} OFFSET ${offset}`
  )

  const results = {
    tagSummaries,
    pagination: {
      limit: limit,
      offset: offset,
      ...total,
    },
  }

  return results
}
