import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const popularTagsQuery = ({
  top = 10,
  entityType = 'food',
  period = 'month',
  score = 0.5,
}) => {
  return `
  WITH t1 AS (
    SELECT
      lower(g.label) AS "label",
      date_trunc('${period}',
        coalesce(t. "publishedAt",
          a. "publishedAt")) AS date,
      sum(g.mentions) as mentions
    FROM
      "Tag" AS g
    LEFT JOIN "Tweet" AS t ON t.id = g. "tweetId"
    LEFT JOIN "Article" AS a ON a.id = g. "articleId"
  WHERE
    g.confidence >= ${score}
    AND NOT('date' = ANY (g. "entityTypes"))
    AND('${entityType}' = ANY (g. "entityTypes"))
    AND label != 'wine'
  GROUP BY 1, 2
  ORDER BY
    2,
    1
  ),
  t3 AS (
    SELECT
      label,
      date,
      sum(mentions) AS total,
      rank() OVER (PARTITION BY date ORDER BY sum(mentions)
        DESC) AS ranking
    FROM
      t1
    GROUP BY
      2,
      1
  ),
  t4 AS (
  SELECT
    *,
    coalesce(lag(total) OVER (PARTITION BY label ORDER BY date),
  0) AS "previousTotal"
  FROM
    t3
  ),
  t5 AS (
  SELECT
    date,
    label,
    total,
    "previousTotal",
    total - "previousTotal" AS delta,
    CASE WHEN (total - "previousTotal") = 0
    OR(total - "previousTotal") IS NULL THEN
      0
    WHEN "previousTotal" = 0
      OR "previousTotal" IS NULL THEN
      0
    ELSE
      round(((total - "previousTotal") / "previousTotal"::numeric)::numeric * 100,
  2)
    END AS "pctChange",
    ranking
  FROM
    t4
  WHERE
    date = date_trunc('${period}',
    CURRENT_TIMESTAMP) - INTERVAL '0 ${period}'
    AND ranking <= ${top} ORDER BY
      date,
      ranking ASC
  )
  SELECT
    '${entityType}' AS "entityType", ${top} AS top, '${period}' AS period, ${score} AS score, date, label, total, "previousTotal", delta, CASE WHEN delta > 0 THEN
      1
    WHEN delta < 0 THEN
      - 1
    ELSE
      0
    END AS "deltaDirection", "pctChange", ranking, rank() OVER (PARTITION BY date ORDER BY "pctChange" DESC) AS "rankingPctChange"
    FROM
      t5
    ORDER BY
      date,
      ranking ASC
`
}

export const popularTags = async ({
  top = 10,
  entityType = 'food',
  period = 'month',
  score = 0.8,
}) => {
  logger.debug({ top, entityType, period, score }, 'Query popularTags')

  return await db.$queryRaw(
    popularTagsQuery({ top, entityType, period, score })
  )
}
