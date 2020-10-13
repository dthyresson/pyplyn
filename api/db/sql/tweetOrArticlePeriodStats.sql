WITH s1 AS (
	SELECT
		1 AS duration,
		'month' AS period
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
		"Tweet" AS t
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
		"Tweet" AS t
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
