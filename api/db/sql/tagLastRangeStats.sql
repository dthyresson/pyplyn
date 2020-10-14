WITH s1 AS (
	SELECT
		7 AS duration,
		'day' AS period
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
	AND('food' = ANY (g. "entityTypes"))
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
	AND('food' = ANY (g. "entityTypes"))
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
