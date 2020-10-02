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
		g.label != 'Wine'
	GROUP BY
		1,
		2
),
 all_dates as (
select distinct tweet_date, 0 as total from t1 order by tweet_date
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

interpolated_data as (
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
		1) bump
