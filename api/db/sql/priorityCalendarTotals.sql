WITH t1 AS (
	SELECT
		p.id,
		date_trunc('day',
			a. "publishedAt") AS date,
		p. "label"
	FROM
		"ArticlePriority" p
		JOIN "Article" a ON a.id = p. "articleId"
UNION ALL
SELECT
	t.id,
	date_trunc('day',
		t. "publishedAt") AS date,
	p. "label"
FROM
	"TweetPriority" p
	JOIN "Tweet" t ON t.id = p. "tweetId"
),
pivot AS (
	SELECT
		s.label,
		json_object_agg(s.date,
			s.total
		ORDER BY
			1) AS totals
	FROM (
		SELECT
			t1.label,
			t1.date,
			count(t1.label) AS total
		FROM
			t1
		WHERE
			t1.date >= (CURRENT_TIMESTAMP - '90 days'::interval)
		GROUP BY
			1,
			2) s
	GROUP BY
		s.label
	ORDER BY
		s.label
)
SELECT
	(json_build_object('label', pivot.label)::jsonb || pivot.totals::jsonb)::json AS totals
FROM
	pivot;
