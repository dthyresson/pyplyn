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
		count(label) AS "currentPeriodTotal",
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
	date = date_trunc('month',
	CURRENT_TIMESTAMP) - INTERVAL '0 week'
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
	'month' AS period,
	CURRENT_TIMESTAMP AS CURRENT,
	date AS "currentPeriod",
	"currentPeriodTotal",
	date - interval '1 month' AS "priorPeriod",
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
