import { DocumentType } from '@prisma/client'

import {
  createArticleCategories,
  createArticlePriorities,
} from 'src/services/articleServices'
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

  const result = await createTweetCategories(tweet)

  return result
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
      let result = await createTweetCategory({
        tweetId: tweet.id,
        uid: category.id,
        label: category.label,
      })

      logger.debug({ result }, 'createTweetCategory')
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

  const priorities = await createTweetPriorities(tweet)

  return priorities
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

      let result = undefined

      priority.searchTerms?.parts?.forEach(async (term) => {
        const label = term.label || term.text || term.id?.split('/').pop()

        result = await db.tweetPriorityTerm.create({
          data: {
            tweetPriority: {
              connect: { id: tweetPriority.id },
            },
            uid: term.id || 'nlp/f/entity/unknown',
            label: label,
          },
          include: { tweetPriority: true },
        })

        logger.warn(
          { result: result, id: tweetPriority.id, label: label },
          'Added tweetPriorityTerm'
        )
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

export const persistLinkedArticle = async (linkedArticle, tweet) => {
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

    logger.debug(
      { articleId: article.id, article: article },
      `Linking article ${article.id} to tweet ${tweet.id}`
    )
    let result = undefined

    result = await db.tweet.update({
      where: { id: tweet.id },
      data: { articles: { connect: [{ id: article.id }] } },
    })

    logger.info(
      { articleId: article.id },
      `Linked article ${article.id} to tweet ${tweet.id}`
    )

    result = await createArticleCategories(article)

    result = await createArticlePriorities(article)

    result = await enrichArticleId({ id: article.id })

    logger.debug(result, 'Completed persistLinkedArticle')

    return article
  } catch (e) {
    logger.error(e.message)
    logger.debug(e.stack)
    return
  }
}

export const persistLinkedArticlesForEntryId = async ({ id, tweetId }) => {
  const entry = await entryById({ id: id })
  const tweet = await db.tweet.tweetById({ id: tweetId })

  if (entry === undefined || tweet === undefined) {
    logger.error(
      { entryId: id, tweetId: tweetId },
      'persistLinkedArticlesForEntryId entry or tweet not found!'
    )
  }

  const articles = linkedEntriesParser(entry).map(async (linkedArticle) => {
    const article = await persistLinkedArticle(linkedArticle, tweet)
    logger.debug(
      { articleId: article.id },
      `persistLinkedArticlesForEntryId ${article.id}`
    )
    return article
  })

  return articles
}

export const persistLinkedArticles = async (entry, tweet) => {
  const articles = linkedEntriesParser(entry).map(async (linkedArticle) => {
    const article = await persistLinkedArticle(linkedArticle, tweet)
    if (article !== undefined) {
      logger.debug(
        { articleId: article.id },
        `persistLinkedArticles ${article.id}`
      )
    }
    return article
  })

  return articles
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

    let result = undefined

    result = await createTweetCategories(tweet)

    result = await createTweetPriorities(tweet)

    result = await enrichTweet(tweet)

    result = await persistLinkedArticles(entry, tweet)

    logger.debug(
      { result, tweet: { id: tweet.id, title: tweet.title } },
      `Successfully persistTweet: ${tweet.id}`
    )
  } catch (e) {
    logger.error(e, `persistTweet error: ${e.message}`)
    logger.warn(e.stack, 'persistTweet error stack')
  }
}
