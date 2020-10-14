import { db } from 'src/lib/db'
import { DocumentType } from '@prisma/client'

const documentTypePeriodTotalStatsQuery = ({
  period = 'month',
  documentType = DocumentType.TWEET,
}) => {
  const model = documentType === DocumentType.TWEET ? 'Tweet' : 'Article'

  return `
    WITH s1 AS (
      SELECT
        1 AS duration,
        '${period}' AS period
    ),
    p1 AS (
      SELECT
        s1.duration,
        s1.period,
        CURRENT_TIMESTAMP AS CURRENT,
        date_trunc(s1.period,
          CURRENT_TIMESTAMP) AS "currentPeriod",
        date_trunc(s1.period,
          CURRENT_TIMESTAMP) - CAST(s1.duration || ' ' || s1.period AS Interval) AS "priorPeriod"
      FROM
        s1
    ),
    t1 AS (
      SELECT
        date_trunc(p1.period,
          t. "publishedAt") AS date,
        p1.period AS period,
        count(t.id) AS total
      FROM
        "${model}" AS t
        JOIN p1 ON p1. "currentPeriod" = date_trunc(p1.period,
          t. "publishedAt")
      GROUP BY
        1, 2
      ORDER BY
        1
    ),
    t2 AS (
      SELECT
        date_trunc(p1.period,
          t. "publishedAt") AS date,
        p1.period AS period,
        count(t.id) AS total
      FROM
        "${model}" AS t
        JOIN p1 ON p1. "priorPeriod" = date_trunc(p1.period,
          t. "publishedAt")
      GROUP BY
        1,2
      ORDER BY
        1
    ),
    t3 AS (
      SELECT
        p1.duration,
        p1.period,
        p1.current,
        p1. "currentPeriod",
        t1.total AS "currentPeriodTotal",
        p1. "priorPeriod",
        coalesce(t2.total,
          0) AS "priorPeriodTotal",
        t1.total - coalesce(t2.total,
          0) AS delta
      FROM
        t1
        JOIN p1 ON p1.period = t1.period
        LEFT JOIN t2 ON t1.period = t2.period
    )
    SELECT
      t3.duration,
      t3.period,
      t3.current,
      t3. "currentPeriod",
      t3. "currentPeriodTotal",
      t3. "priorPeriod",
      t3. "priorPeriodTotal",
      t3.delta,
      CASE WHEN delta > 0 THEN
        1
      WHEN delta < 0 THEN
        - 1
      ELSE
        delta
      END AS "deltaDirection",
      CASE WHEN delta = 0
        OR delta IS NULL THEN
        0
      WHEN "priorPeriodTotal" = 0
        OR "priorPeriodTotal" IS NULL THEN
        0
      ELSE
        round((delta / "priorPeriodTotal"::numeric)::numeric * 100, 2)
      END AS "pctChange"
    FROM
      t3
  `
}

const tweetPeriodTotalStatsQuery = ({ period }) => {
  return documentTypePeriodTotalStatsQuery({
    period,
    documentType: DocumentType.TWEET,
  })
}

const articlePeriodTotalStatsQuery = ({ period }) => {
  return documentTypePeriodTotalStatsQuery({
    period,
    documentType: DocumentType.ARTICLE,
  })
}

const tagPeriodTotalStatsQuery = ({ period, entityType = 'food' }) => {
  return `
  WITH t1 AS (
    SELECT
      lower(g.label) AS "label",
      date_trunc('${period}',
        coalesce(t. "publishedAt",
          a. "publishedAt")) AS date,
      g.mentions
    FROM
      "Tag" AS g
    LEFT JOIN "Tweet" AS t ON t.id = g. "tweetId"
    LEFT JOIN "Article" AS a ON a.id = g. "articleId"
  WHERE
    g.confidence >= 0.8
    AND NOT('date' = ANY (g. "entityTypes"))
    AND('${entityType}' = ANY (g. "entityTypes"))
    AND label != 'wine'
  ORDER BY
    2,
    1
  ),
  t3 AS (
    SELECT
      label,
      date,
      sum(mentions) AS "currentPeriodTotal",
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
    lag("currentPeriodTotal",
    1) OVER (PARTITION BY label ORDER BY date) AS "priorPeriodTotal"
  FROM
    t3
  ),
  t5 AS (
  SELECT
    date,
    label,
    "currentPeriodTotal",
    "priorPeriodTotal",
    "currentPeriodTotal" - "priorPeriodTotal" AS delta,
    CASE WHEN ("currentPeriodTotal" - "priorPeriodTotal") = 0
    OR("currentPeriodTotal" - "priorPeriodTotal") IS NULL THEN
      0
    WHEN "priorPeriodTotal" = 0
      OR "priorPeriodTotal" IS NULL THEN
      0
    ELSE
      round((("currentPeriodTotal" - "priorPeriodTotal") / "priorPeriodTotal"::numeric)::numeric * 100,
  2)
    END AS "pctChange",
    ranking
  FROM
    t4
  WHERE
    date = date_trunc('${period}',
    CURRENT_TIMESTAMP) - INTERVAL '0 ${period}'
    --AND ranking <= 20
    ORDER BY
      date,
      ranking ASC
  ),
  t6 AS (
  SELECT
    date,
    label,
    "currentPeriodTotal",
    "priorPeriodTotal",
    delta,
    "pctChange",
    ranking,
    rank() OVER (PARTITION BY date ORDER BY "pctChange" DESC) AS "rankingPctChange"
  FROM
    t5 ORDER BY
      date,
      ranking ASC
  ),
  t7 AS (
  SELECT
    date,
    sum("currentPeriodTotal") AS "currentPeriodTotal",
    sum("priorPeriodTotal") AS "priorPeriodTotal",
    sum("currentPeriodTotal") - sum("priorPeriodTotal") AS delta
  FROM
    t6
  GROUP BY
    1
  )
  SELECT
    1 AS duration,
    '${period}' AS period,
    CURRENT_TIMESTAMP AS CURRENT,
    date AS "currentPeriod",
    "currentPeriodTotal",
    date - interval '1 ${period}' AS "priorPeriod",
    "priorPeriodTotal",
    delta,
    CASE WHEN delta > 0 THEN
      1
    WHEN delta < 0 THEN
      - 1
    ELSE
      delta
    END AS "deltaDirection",
    CASE WHEN delta = 0
      OR delta IS NULL THEN
      0
    WHEN "priorPeriodTotal" = 0
      OR "priorPeriodTotal" IS NULL THEN
      0
    ELSE
      round((delta / "priorPeriodTotal"::numeric)::numeric * 100, 2)
    END AS "pctChange"
  FROM
    t7
`
}

const emptyPeriodTotalStat = {
  duration: 1,
  period: 'None',
  current: Date.now(),
  currentPeriod: Date.now(),
  currentPeriodTotal: 0,
  priorPeriod: Date.now(),
  priorPeriodTotal: 0,
  delta: 0,
  deltaDirection: 0,
  pctChange: 0,
}

export const periodTotalStats = async ({ period = 'month' }) => {
  const tweetPeriodTotalStat =
    (await db.$queryRaw(tweetPeriodTotalStatsQuery({ period })))[0] ||
    emptyPeriodTotalStat

  const articlePeriodTotalStat =
    (await db.$queryRaw(articlePeriodTotalStatsQuery({ period })))[0] ||
    emptyPeriodTotalStat

  const tagPeriodTotalStat =
    (
      await db.$queryRaw(
        tagPeriodTotalStatsQuery({ period, entityType: 'food' })
      )
    )[0] || emptyPeriodTotalStat

  return { tweetPeriodTotalStat, articlePeriodTotalStat, tagPeriodTotalStat }
}
