import {
  entryParser,
  tweetEntryParser,
  linkedArticleParser,
} from 'src/lib/parsers/entry'

import { enrichArticle, enrichTweet } from 'src/services/enrichment'
import { fromUnixTime } from 'date-fns'

import { DocumentType } from '@prisma/client'

import { db } from 'src/lib/db'

export const createTweetCategory = async ({ tweetId, uid, label }) => {
  const tweetCategory = await db.tweetCategory.create({
    data: {
      tweet: {
        connect: { id: tweetId },
      },
      uid,
      label,
    },
    include: { tweet: true },
  })

  return tweetCategory
}

export const createTweetCategories = async (tweet) => {
  return tweet.entry?.document?.categories?.map(async (category) => {
    return await createTweetCategory({
      tweetId: tweet.id,
      uid: category.id,
      label: category.label,
    })
  })
}

export const createTweetPriority = async ({ tweetId, uid, label }) => {
  const tweetPriority = await db.tweetPriority.create({
    data: {
      tweet: {
        connect: { id: tweetId },
      },
      uid,
      label,
    },
    include: { tweet: true },
  })

  return tweetPriority
}

export const createTweetPriorities = async (tweet) => {
  return tweet.entry?.document?.priorities?.map(async (priority) => {
    const tweetPriority = await createTweetPriority({
      tweetId: tweet.id,
      uid: priority.id,
      label: priority.label,
    })

    priority.searchTerms?.parts?.map(async (term) => {
      await db.tweetPriorityTerm.create({
        data: {
          tweetPriority: {
            connect: { id: tweetPriority.id },
          },
          uid: term.id || 'nlp/f/entity/unknown',
          label: term.label || term.text,
        },
        include: { tweetPriority: true },
      })
    })

    return tweetPriority
  })
}

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
            documentType: DocumentType.ARTICLE,
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
