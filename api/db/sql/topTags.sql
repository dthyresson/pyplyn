WITH t1 AS (
	SELECT
		lower(g.label) AS "label",
		date_trunc('month',
			coalesce(t. "publishedAt",
				a. "publishedAt")) AS date
	FROM
		"Tag" AS g
	LEFT JOIN "Tweet" AS t ON t.id = g. "tweetId"
	LEFT JOIN "Article" AS a ON a.id = g. "articleId"
WHERE
	g.confidence >= 0.8
	AND NOT('date' = ANY (g. "entityTypes"))
	AND('food' = ANY (g. "entityTypes"))
	AND label != 'wine'
ORDER BY
	2,
	1
),
t3 AS (
	SELECT
		label,
		date,
		count(label) AS total,
		rank() OVER (PARTITION BY date ORDER BY count(label)
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
	lag(total) OVER (PARTITION BY label ORDER BY date) AS "previousTotal"
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
	date = date_trunc('month',
	CURRENT_TIMESTAMP) - INTERVAL '0 week'
	AND ranking <= 20 ORDER BY
		date,
		ranking ASC
)
SELECT
	date, label, total, "previousTotal", delta, "pctChange", ranking, rank() OVER (PARTITION BY date ORDER BY "pctChange" DESC) AS "rankingPctChange"
	FROM
		t5
	ORDER BY
		date,
		ranking ASC
