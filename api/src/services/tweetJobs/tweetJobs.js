import {
  entryParser,
  tweetEntryParser,
  linkedArticleParser,
} from 'src/lib/parsers/entry'
import { createTweetCategories } from 'src/services/tweetCategories'
import { createTweetPriorities } from 'src/services/tweetPriorities'
import { enrichArticle, enrichTweet } from 'src/services/enrichment'
import { fromUnixTime } from 'date-fns'

import { db } from 'src/lib/db'

export const loadTweet = async ({ entry }) => {
  const parsedTweet = tweetEntryParser(entry)

  const tweet = await db.tweet.create({
    data: {
      entry: {
        create: entryParser(entry),
      },
      ...parsedTweet,
    },
    include: { entry: true },
  })

  await createTweetCategories(tweet)

  await createTweetPriorities(tweet)

  await enrichTweet(tweet)

  const entries = linkedArticleParser(entry)

  entries.forEach(async (linkedEntry) => {
    const publishedAt = fromUnixTime(
      (linkedEntry.published || linkedEntry.updated || linkedEntry.crawled) /
        1000
    )

    const url = linkedEntry.canonical[0]?.href || linkedEntry.alternate[0]?.href

    const article = await db.article.create({
      data: {
        entry: {
          create: {
            uid: linkedEntry.id,
            documentType: 'ARTICLE',
            document: linkedEntry,
          },
        },
        author:
          linkedEntry.authorDetails?.fullname ||
          linkedEntry.author ||
          'unknown',
        publishedAt,
        title: linkedEntry.title || 'unknown',
        url,
      },
    })

    await enrichArticle(article)
  })

  return tweet
}

export const loadTweets = async ({ response }) => {
  return response.items.map(async (item) => {
    return await loadTweet({ entry: item })
  })
}
