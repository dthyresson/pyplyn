import { DocumentType } from '@prisma/client'

import {
  entryParser,
  tweetEntryParser,
  linkedArticleParser,
} from 'src/lib/parsers/entryParser'
import { enrichArticle, enrichTweet } from 'src/services/enrichment'
import { logger } from 'src/lib/logger/logger'
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
      const label = term.label || term.text || term.id?.split('/').pop()

      await db.tweetPriorityTerm.create({
        data: {
          tweetPriority: {
            connect: { id: tweetPriority.id },
          },
          uid: term.id || 'nlp/f/entity/unknown',
          label: label,
        },
        include: { tweetPriority: true },
      })
    })

    return tweetPriority
  })
}

export const loadArticle = async (linkedEntry) => {
  try {
    const article = await db.article.create({
      data: {
        entry: {
          create: {
            uid: linkedEntry.id,
            documentType: DocumentType.ARTICLE,
            document: linkedEntry,
          },
        },
        author: linkedEntry.articleAuthor,
        description: linkedEntry.description,
        publishedAt: linkedEntry.articlePublishedAt,
        title: linkedEntry.articleTitle,
        url: linkedEntry.articleUrl,
        tagLabels: { set: [''] },
      },
    })

    await enrichArticle(article)

    return article
  } catch (e) {
    logger.error(e.message)
    logger.debug(e.stack)

    logger.error(e, e.message)
    logger.debug(e, e.stack)
    return
  }
}

export const loadLinkedArticles = async (entry) => {
  linkedArticleParser(entry).forEach(async (linkedEntry) => {
    await loadArticle(linkedEntry)
  })
}

export const loadTweet = async ({ entry }) => {
  logger.debug(
    { entryId: entry.id, documumentType: entry.DocumentType },
    `loadTweet dfor entry: ${entry.id}`
  )

  const parsedTweet = tweetEntryParser(entry)

  try {
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

    await loadLinkedArticles(entry)

    return tweet
  } catch (e) {
    logger.error(e.message)
    logger.debug(e.stack)

    logger.error(e, `loadTweet error: ${e.message}`)
    logger.debug(e.stack, 'loadTweet error stack')
    return
  }
}

export const loadTweets = async ({ response }) => {
  response.items.forEach(async (item) => {
    await loadTweet({ entry: item })
  })
  return
}
