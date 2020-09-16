import { db } from 'src/lib/db'

import { extractArticleUrl, extractText } from 'src/lib/apiClients/diffbot'
import { entryParser, tweetEntryParser } from 'src/lib/parsers/entry'
import { createTweetCategories } from 'src/services/tweetCategories'
import { createTweetPriorities } from 'src/services/tweetPriorities'
import { tweetForUrl } from 'src/services/tweets'

export const loadTweet = async ({ entry }) => {
  const parsedTweet = tweetEntryParser(entry)
  const existingTweet = await tweetForUrl({ url: parsedTweet.url })

  if (existingTweet) {
    return existingTweet
  } else {
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
}

export const loadTweets = async ({ response }) => {
  return response.items.map(async (item) => {
    return await loadTweet({ entry: item })
  })
}

export const enrichArticle = async (article) => {
  const content = await extractArticleUrl({
    url: article.url,
  })

  return await db.articleContext.create({
    data: {
      article: {
        connect: { id: article.id },
      },
      content,
    },
  })
}

export const enrichTweet = async (tweet) => {
  const content = await extractText({
    content: tweet.content,
    lang: 'en',
  })

  return await db.tweetContext.create({
    data: {
      tweet: {
        connect: { id: tweet.id },
      },
      content,
    },
  })
}
