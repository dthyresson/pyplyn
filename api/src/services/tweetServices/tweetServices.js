import { DocumentType } from '@prisma/client'

import { entryById } from 'src/services/entryQueries'
import { tweetById } from 'src/services/tweetQueries'

import {
  entryParser,
  tweetEntryParser,
  linkedEntriesParser,
} from 'src/lib/parsers/entryParser'
import { enrichArticleId, enrichTweet } from 'src/services/enrichment'
import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'

export const createTweetCategory = async ({ tweetId, uid, label }) => {
  try {
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
  } catch (e) {
    logger.error(e, `createTweetCategory error: ${e.message}`)
    logger.warn(e.stack, 'createTweetCategory error stack')
    return null
  }
}

export const persistTweetCategories = async ({ id }) => {
  logger.debug({ tweetId: id }, `persistTweetCategories for tweetId: ${id}`)

  const tweet = await tweetById({ id: id })

  if (tweet == undefined) {
    logger.warn(`persistTweetCategories has undefined tweet for id ${id}`)
  }

  await createTweetCategories(tweet)

  return
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

  tweet.entry?.document?.categories?.map(async (category) => {
    try {
      await createTweetCategory({
        tweetId: tweet.id,
        uid: category.id,
        label: category.label,
      })
    } catch (e) {
      logger.error(e, `createTweetCategory error: ${e.message}`)
      logger.warn(e.stack, 'createTweetCategory error stack')
    }
  })

  return
}

export const persistTweetPriorities = async ({ id }) => {
  logger.debug({ tweetId: id }, `persistTweetPriorities for tweetId: ${id}`)

  const tweet = await tweetById({ id: id })

  if (tweet == undefined) {
    logger.warn(
      { tweetId: id },
      `persistTweetPriorities has undefined tweet for id ${id}`
    )
  }

  await createTweetPriorities(tweet)

  return
}

export const createTweetPriorities = async (tweet) => {
  if (tweet == undefined) {
    logger.error(
      { tweetId: undefined }`createTweetPriorities has undefined tweet`
    )
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

  tweet.entry?.document?.priorities?.map(async (priority) => {
    try {
      const tweetPriority = await createTweetPriority({
        tweetId: tweet.id,
        uid: priority.id,
        label: priority.label,
      })

      priority.searchTerms?.parts?.forEach(async (term) => {
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
    } catch (e) {
      logger.error(e, `createTweetPriority error: ${e.message}`)
      logger.warn(e.stack, 'createTweetPriority error stack')
    }
  })

  return
}

export const createTweetPriority = async ({ tweetId, uid, label }) => {
  try {
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
  } catch (e) {
    logger.error(e, `createTweetPriority error: ${e.message}`)
    logger.warn(e.stack, 'createTweetPriority error stack')
    return
  }
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
  const parsedEntry = entryParser(entry)

  logger.debug({ uid: parsedEntry.uid }, `parsedEntry entry: ${entry.id}`)

  try {
    const tweet = await db.tweet.create({
      data: {
        entry: {
          connectOrCreate: {
            where: { uid: parsedEntry.uid },
            create: parsedEntry,
          },
        },
        ...parsedTweet,
      },
      include: { entry: true },
    })

    // TODO: replace all with scheduler repeater tasks
    // await persistTweetCategories({ id: tweet.id })
    await createTweetCategories(tweet)

    // await persistTweetPriorities({ id: tweet.id })
    await createTweetPriorities(tweet)

    await enrichTweet(tweet)
    // await enrichTweetId({ id: tweet.id })

    // TODO - return articles w/ entry ids and create tweetLinkedArticle relations
    await persistLinkedArticles(entry)
    // await persistLinkedArticlesForEntryId({ id: tweet.entryId })

    logger.debug(
      { tweet: { id: tweet.id, title: tweet.title } },
      `Successfully persistTweet: ${tweet.id}`
    )
  } catch (e) {
    logger.error(e, `persistTweet error: ${e.message}`)
    logger.warn(e.stack, 'persistTweet error stack')
  }
}

export const persistTweets = async ({ data }) => {
  try {
    data?.items.forEach(async (item) => {
      try {
        await persistTweet({ entry: item })
      } catch (e) {
        logger.error(e, `persistTweets persistTweet error: ${e.message}`)
        logger.warn(e.stack, 'persistTweets persistTweet error stack')
      }
    })
  } catch (e) {
    logger.error(e, `persistTweets error: ${e.message}`)
    logger.warn(e.stack, 'persistTweets  error stack')
  }
}
