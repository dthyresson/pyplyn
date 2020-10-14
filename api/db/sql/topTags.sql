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
	date = date_trunc('month',
	CURRENT_TIMESTAMP) - INTERVAL '0 month'
	AND ranking <= 20 ORDER BY
		date,
		ranking ASC
)
SELECT
	'food' AS "entityType", 20 AS top, 'month' AS period, 0.8 AS confidence, date, label, total, "previousTotal", delta, CASE WHEN delta > 0 THEN
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
