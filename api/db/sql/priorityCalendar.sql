WITH t1 AS (
	SELECT
		p.id,
		date_trunc('day',
			a. "publishedAt") AS day,
		INITCAP(p. "label") AS label
	FROM
		"ArticlePriority" p
		JOIN "Article" a ON a.id = p. "articleId"
UNION ALL
SELECT
	p.id,
	date_trunc('day',
		t. "publishedAt") AS day,
	INITCAP(p. "label") AS label
FROM
	"TweetPriority" p
	JOIN "Tweet" t ON t.id = p. "tweetId"
),
l AS (
	SELECT DISTINCT
		label
	FROM
		t1
),
interpolate_days AS (
	SELECT
		l.label,
		date_trunc('day',
			dd)::TIMESTAMP AS day,
		0 AS value
	FROM
		generate_series((CURRENT_TIMESTAMP - '30 days'::interval),
		CURRENT_TIMESTAMP,
		'1 day'::interval) dd
		CROSS JOIN l
	ORDER BY
		1,
		2
),
pivot AS (
	SELECT
		s.label,
		json_build_object('day',
			s.day,
			'value',
			s.total) AS totals
	FROM (
		SELECT
			i.label,
			i.day,
			count(i.label) - 1 AS total
		FROM
			interpolate_days i
		LEFT JOIN t1 ON i.day = t1.day
			AND i.label = t1.label
	WHERE
		i.day >= (CURRENT_TIMESTAMP - '30 days'::interval)
	GROUP BY
		1,
		2
	ORDER BY
		1,
		2) s
ORDER BY
	s.label
)
SELECT
	label,
	json_agg(totals
	ORDER BY
		1) AS calendar
FROM
	pivot
GROUP BY
	1
ORDER BY
	1;


