import { DocumentType } from '@prisma/client'

import { entryById } from 'src/services/entryQueries'
import { tweetById } from 'src/services/tweetQueries'

import {
  entryParser,
  tweetEntryParser,
  linkedEntriesParser,
} from 'src/lib/parsers/entryParser'
import { enrichArticleId, enrichTweetId } from 'src/services/enrichment'
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

export const persistTweetCategories = async ({ id }) => {
  logger.debug({ tweetId: id }, `persistTweetCategories for tweetId: ${id}`)

  const tweet = await tweetById({ id: id })

  if (tweet == undefined) {
    logger.warn(`persistTweetCategories has undefined tweet for id ${id}`)
  }

  return await createTweetCategories(tweet)
}

export const createTweetCategories = async (tweet) => {
  if (tweet == undefined) {
    logger.error(`createTweetCategories has undefined tweet`)
    return
  }

  logger.debug(
    { tweetId: tweet.id },
    `createTweetCategories for tweet: ${tweet.id}`
  )

  if (tweet.entry?.document?.categories === undefined) {
    logger.warn(
      { tweetId: tweet.id },
      `createTweetCategories missing categories for tweet: ${tweet.id}`
    )
  }

  return tweet.entry?.document?.categories?.map(async (category) => {
    return await createTweetCategory({
      tweetId: tweet.id,
      uid: category.id,
      label: category.label,
    })
  })
}

export const persistTweetPriorities = async ({ id }) => {
  logger.debug({ tweetId: id }, `persistTweetPriorities for tweetId: ${id}`)

  const tweet = await tweetById({ id: id })

  if (tweet == undefined) {
    logger.warn(`persistTweetPriorities has undefined tweet for id ${id}`)
  }

  return await createTweetPriorities(tweet)
}

export const createTweetPriorities = async (tweet) => {
  if (tweet == undefined) {
    logger.error(`createTweetPriorities has undefined tweet`)
    return
  }

  logger.debug(
    { tweetId: tweet.id },
    `createTweetPriorities for tweet: ${tweet.id}`
  )

  if (tweet.entry?.document?.priorities === undefined) {
    logger.warn(
      { tweetId: tweet.id },
      `createTweetPriorities missing priorities for tweet: ${tweet.id}`
    )
  }

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

export const persistLinkedArticle = async (linkedArticle) => {
  try {
    const article = await db.article.create({
      data: {
        entry: {
          create: {
            uid: linkedArticle.id,
            documentType: DocumentType.ARTICLE,
            document: linkedArticle,
          },
        },
        author: linkedArticle.articleAuthor,
        description: linkedArticle.description,
        publishedAt: linkedArticle.articlePublishedAt,
        title: linkedArticle.articleTitle,
        url: linkedArticle.articleUrl,
        tagLabels: { set: [''] },
      },
    })

    // await enrichArticle(article)
    await enrichArticleId({ id: article.id })

    return article
  } catch (e) {
    logger.error(e.message)
    logger.debug(e.stack)

    logger.error(e, e.message)
    logger.debug(e, e.stack)
    return
  }
}

export const persistLinkedArticlesForEntryId = async ({ id }) => {
  const entry = await entryById({ id: id })

  if (entry === undefined) {
    logger.error(`persistLinkedArticlesForEntryId entry ${id} not found!`)
  }

  linkedEntriesParser(entry).forEach(async (linkedArticle) => {
    await persistLinkedArticle(linkedArticle)
  })
}

export const persistLinkedArticles = async (entry) => {
  linkedEntriesParser(entry).forEach(async (linkedArticle) => {
    await persistLinkedArticle(linkedArticle)
  })
}

export const persistTweet = async ({ entry }) => {
  logger.debug(
    { entryId: entry.id, documumentType: entry.DocumentType },
    `persistTweet for entry: ${entry.id}`
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

    // TODO: replace all with scheduler repeater tasks
    await persistTweetCategories({ id: tweet.id })
    // await createTweetCategories(tweet)

    await persistTweetPriorities({ id: tweet.id })
    // await createTweetPriorities(tweet)

    // await enrichTweet(tweet)
    await enrichTweetId({ id: tweet.id })

    // await persistLinkedArticles(entry)
    persistLinkedArticlesForEntryId({ id: tweet.entryId })

    return tweet
  } catch (e) {
    logger.error(e.message)
    logger.debug(e.stack)

    logger.error(e, `persistTweet error: ${e.message}`)
    logger.debug(e.stack, 'persistTweet error stack')
    return
  }
}

export const persistTweets = async ({ response }) => {
  response.items.forEach(async (item) => {
    await persistTweet({ entry: item })
  })
  return
}
