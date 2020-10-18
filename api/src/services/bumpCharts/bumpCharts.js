import { db } from 'src/lib/db'

const BUMP_CHART_SQL = `
WITH t1 AS (
	SELECT
		(date_trunc('day'::text,
				t. "publishedAt"))::date AS tweet_date,
		g.label,
		count(g.label) as total
	FROM
		"TweetPriority" g
		JOIN "Tweet" t ON t.id = g. "tweetId"
	WHERE
    g.label != 'Wine' AND
    t."publishedAt" >= CURRENT_TIMESTAMP - interval '7 days'
	GROUP BY
		1,
    2

  UNION

  SELECT
  (date_trunc('day'::text,
      t. "publishedAt"))::date AS tweet_date,
  g.label,
  count(g.label) as total
FROM
  "ArticlePriority" g
  JOIN "Article" t ON t.id = g. "articleId"
WHERE
  g.label != 'Wine' AND
  t."publishedAt" >= CURRENT_TIMESTAMP - interval '7 days'
GROUP BY
  1,
  2
),

all_dates as (
  SELECT DISTINCT tweet_date, 0 AS total FROM t1 ORDER BY tweet_date
),

all_priorities AS (
	SELECT DISTINCT
		label
	FROM
		t1
),

all_data AS (
	SELECT
		*
	FROM
		all_dates
	CROSS JOIN all_priorities
),

interpolated_data AS (
  SELECT
			ad.label AS id,
			ad.tweet_date AS x,
			coalesce(t1.total, ad.total) AS y
		FROM
			t1
			full join all_data ad on ad.tweet_date = t1.tweet_date and ad.label = t1.label
			order by 1, 2
)

SELECT
	row_to_json(bump) AS priority_bump_data
FROM (
	SELECT
		d.id,
		to_json(array_agg(to_jsonb (row_to_json(d)) - 'id')) AS data
	FROM (
		SELECT
			id,
			x,
			y
		FROM
			interpolated_data
    ORDER BY id, x
      ) d
	GROUP BY
		1) bump;
`

export const bumpChart = async () => {
  const result = await db.$queryRaw(BUMP_CHART_SQL)
  const chartDataSeries = result?.map((chart) => {
    return chart.priority_bump_data
  })
  return { chart: chartDataSeries }
}
