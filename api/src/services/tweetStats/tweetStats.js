import { db } from 'src/lib/db'
import { DocumentType } from '@prisma/client'

const statsSqlQuery = ({ period, documentType = DocumentType.TWEET }) => {
  const model = documentType === DocumentType.TWEET ? 'Tweet' : 'Article'

  return `
    WITH t1 AS (
      SELECT
        date_trunc('${period}',
          "publishedAt") AS date,
        '${period}' AS period,
        count(id) AS total
      FROM
        "${model}"
      GROUP BY
        1
      ORDER BY
        1
    ),
    t2 AS (
      SELECT
        date,
        period,
        total,
        lag(total,
          1) OVER (ORDER BY date) AS "previousTotal",
        COALESCE(total,
        0) - lag(total,
        1) OVER (ORDER BY date) AS delta,
        round(AVG(total) OVER (ORDER BY date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW),
      4) AS "avg30Period",
        round(AVG(total) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW),
      4) AS "avg7Period",
        round(AVG(total) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW),
      4) AS "avg3Period",
        SUM(total) OVER (ORDER BY date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) AS "total30Period",
        SUM(total) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS "total7Period",
        SUM(total) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS "total3Period",
        rank() OVER (ORDER BY total DESC) AS ranking
      FROM
        t1
    )
    SELECT
      date,
      period,
      coalesce(delta, 0) AS delta,
      total,
      coalesce("previousTotal", 0) AS "previousTotal",
      CASE WHEN delta = 0
        OR delta IS NULL THEN
        0
      WHEN "previousTotal" = 0
        OR "previousTotal" IS NULL THEN
        0
      ELSE
        round((delta / "previousTotal"::numeric)::numeric * 100, 2)
      END AS "pctChange",
      "avg30Period",
      "avg7Period",
      "avg3Period",
      "total30Period",
      "total7Period",
      "total3Period",
      ranking
    FROM
      t2
`
}

const tweetStatsSqlQuery = ({ period }) => {
  return statsSqlQuery({ period, documentType: DocumentType.TWEET })
}

export const tweetStats = async ({ period = 'day', current = false }) => {
  const limit = current ? ' ORDER BY date DESC LIMIT 1' : ''
  return await db.$queryRaw(`${tweetStatsSqlQuery({ period })}${limit}`)
}
