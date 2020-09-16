import { entryParser, tweetEntryParser } from 'src/lib/parsers/entry'
import { createTweetCategories } from 'src/services/tweetCategories'
import { createTweetPriorities } from 'src/services/tweetPriorities'
import { enrichTweet } from 'src/services/enrichment'

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

  return tweet
}

export const loadTweets = async ({ response }) => {
  return response.items.map(async (item) => {
    return await loadTweet({ entry: item })
  })
}
