import { db } from 'src/lib/db'
import { DocumentType } from '@prisma/client'

const documentTypeLastDurationPeriodTotalStatsQuery = ({
  duration = 7,
  period = 'day',
  documentType = DocumentType.TWEET,
}) => {
  const model = documentType === DocumentType.TWEET ? 'Tweet' : 'Article'

  return `
  WITH s1 AS (
    SELECT
      ${duration} AS duration,
      '${period}' AS period
  ),
  p1 AS (
    SELECT
      s1.duration,
      s1.period,
      CURRENT_TIMESTAMP AS CURRENT,
      date_trunc(s1.period,
        CURRENT_TIMESTAMP) + interval '1 day' - interval '1 second' AS "currentPeriod",
      date_trunc(s1.period,
        CURRENT_TIMESTAMP) - CAST(s1.duration || ' ' || s1.period AS Interval) AS "priorPeriod",
      date_trunc(s1.period,
        CURRENT_TIMESTAMP) - CAST(s1.duration * 2 || ' ' || s1.period AS Interval) AS "priorPeriodStart"
    FROM
      s1
  ),
  t1 AS (
    SELECT
      p1.duration,
      p1.period AS period,
      p1. "currentPeriod",
      count(t.id) AS "currentPeriodTotal"
    FROM
      "${model}" AS t
      JOIN p1 ON t. "publishedAt" BETWEEN p1. "priorPeriod"
        AND p1. "currentPeriod"
      GROUP BY
        1,
        2,
        3
      ORDER BY
        1
  ),
  t2 AS (
    SELECT
      p1.duration,
      p1.period AS period,
      p1. "priorPeriod",
      count(t.id) AS "priorPeriodTotal"
    FROM
      "${model}" AS t
    JOIN p1 ON t. "publishedAt" BETWEEN p1. "priorPeriodStart"
      AND(p1. "priorPeriod" + interval '1 day' - interval '1 second')
    GROUP BY
      1,
      2,
      3
    ORDER BY
      1
  ),
  t3 AS (
    SELECT
      p1.*,
      COALESCE(t1. "currentPeriodTotal"::int,
        0) AS "currentPeriodTotal",
      COALESCE(t2. "priorPeriodTotal"::int,
        0) AS "priorPeriodTotal"
    FROM
      p1
    LEFT JOIN t1 ON p1.duration = t1.duration
      AND p1.period = t1.period
    LEFT JOIN t2 ON p1.duration = t2.duration
      AND p1.period = t2.period
  ),
  t4 AS (
    SELECT
      *,
      t3. "currentPeriodTotal" - t3. "priorPeriodTotal" AS delta
    FROM
      t3
  )

  SELECT
    *,
    CASE WHEN delta > 0 THEN
      1
    WHEN delta < 0 THEN
      - 1
    ELSE
      0
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
    t4
  `
}

const tweetLastDurationPeriodTotalStatsQuery = ({ duration, period }) => {
  return documentTypeLastDurationPeriodTotalStatsQuery({
    duration,
    period,
    documentType: DocumentType.TWEET,
  })
}

const articleLastDurationPeriodTotalStatsQuery = ({ duration, period }) => {
  return documentTypeLastDurationPeriodTotalStatsQuery({
    duration,
    period,
    documentType: DocumentType.ARTICLE,
  })
}

const tagLastDurationPeriodTotalStatsQuery = ({
  duration = 7,
  period = 'day',
  entityType = 'food',
}) => {
  return `
  WITH s1 AS (
    SELECT
      ${duration} AS duration,
      '${period}' AS period
  ),
  p1 AS (
    SELECT
      s1.duration,
      s1.period,
      CURRENT_TIMESTAMP AS CURRENT,
      date_trunc(s1.period,
        CURRENT_TIMESTAMP) + interval '1 day' - interval '1 second' AS "currentPeriod",
      date_trunc(s1.period,
        CURRENT_TIMESTAMP) - CAST(s1.duration || ' ' || s1.period AS Interval) AS "priorPeriod",
      date_trunc(s1.period,
        CURRENT_TIMESTAMP) - CAST(s1.duration * 2 || ' ' || s1.period AS Interval) AS "priorPeriodStart"
    FROM
      s1
  ),
  t1 AS (
    SELECT
      p1.duration,
      p1.period AS period,
      p1. "currentPeriod",
      sum(g.mentions) AS "currentPeriodTotal"
    FROM
      "Tag" AS g
    LEFT JOIN "Tweet" AS t ON t.id = g. "tweetId"
    LEFT JOIN "Article" AS a ON a.id = g. "articleId"
    JOIN p1 ON coalesce(t. "publishedAt",
      a. "publishedAt") BETWEEN p1. "priorPeriod"
      AND p1. "currentPeriod"
  WHERE
    g.confidence >= 0.8
    AND NOT('date' = ANY (g. "entityTypes"))
    AND('${entityType}' = ANY (g. "entityTypes"))
    AND label != 'wine'
  GROUP BY
    1,
    2,
    3
  ORDER BY
    1
  ),
  t2 AS (
    SELECT
      p1.duration,
      p1.period AS period,
      p1. "priorPeriod",
      sum(g.mentions) AS "priorPeriodTotal"
    FROM
      "Tag" AS g
    LEFT JOIN "Tweet" AS t ON t.id = g. "tweetId"
    LEFT JOIN "Article" AS a ON a.id = g. "articleId"
    JOIN p1 ON coalesce(t. "publishedAt",
      a. "publishedAt") BETWEEN p1. "priorPeriodStart"
      AND(p1. "priorPeriod" + interval '1 day' - interval '1 second')
  WHERE
    g.confidence >= 0.8
    AND NOT('date' = ANY (g. "entityTypes"))
    AND('${entityType}' = ANY (g. "entityTypes"))
    AND label != 'wine'
  GROUP BY
    1,
    2,
    3
  ORDER BY
    1
  ),
  t3 AS (
    SELECT
      p1.*,
      COALESCE(t1. "currentPeriodTotal"::int,
        0) AS "currentPeriodTotal",
      COALESCE(t2. "priorPeriodTotal"::int,
        0) AS "priorPeriodTotal"
    FROM
      p1
    LEFT JOIN t1 ON p1.duration = t1.duration
      AND p1.period = t1.period
    LEFT JOIN t2 ON p1.duration = t2.duration
      AND p1.period = t2.period
  ),
  t4 AS (
    SELECT
      *,
      t3. "currentPeriodTotal" - t3. "priorPeriodTotal" AS delta
    FROM
      t3
  )

  SELECT
    *,
    CASE WHEN delta > 0 THEN
      1
    WHEN delta < 0 THEN
      - 1
    ELSE
      0
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
    t4
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

export const lastDurationPeriodTotalStats = async ({
  duration = 7,
  period = 'day',
}) => {
  const tweetPeriodTotalStat =
    (
      await db.$queryRaw(
        tweetLastDurationPeriodTotalStatsQuery({ duration, period })
      )
    )[0] || emptyLastDurationPeriodTotalStat

  const articlePeriodTotalStat =
    (
      await db.$queryRaw(
        articleLastDurationPeriodTotalStatsQuery({ duration, period })
      )
    )[0] || emptyLastDurationPeriodTotalStat

  const tagPeriodTotalStat =
    (
      await db.$queryRaw(
        tagLastDurationPeriodTotalStatsQuery({
          duration,
          period,
          entityType: 'food',
        })
      )
    )[0] || emptyPeriodTotalStat

  return {
    tweetPeriodTotalStat,
    articlePeriodTotalStat,
    tagPeriodTotalStat,
  }
}
