import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'

import { articleDetailParser, entryParser } from 'src/lib/parsers/entryParser'
import { enrichArticleId } from 'src/services/enrichment'

export const persistArticle = async ({ entry }) => {
  logger.debug(
    { entryId: entry.id, documumentType: entry.DocumentType },
    `persistArticle for entry: ${entry.id}`
  )

  const parsedEntry = entryParser(entry)
  const parsedArticle = articleDetailParser(entry)

  logger.debug({ uid: parsedEntry.uid }, `parsedEntry entry: ${entry.id}`)
  logger.debug({ parsedArticle }, `parsedArticle for entry: ${entry.id}`)

  try {
    let result = undefined

    const article = await db.article.create({
      data: {
        entry: {
          connectOrCreate: {
            where: { uid: parsedEntry.uid },
            create: parsedEntry,
          },
        },
        author: parsedArticle.articleAuthor,
        description: parsedArticle.description,
        publishedAt: parsedArticle.articlePublishedAt,
        title: parsedArticle.articleTitle,
        url: parsedArticle.articleUrl,
        tagLabels: { set: [''] },
      },
      include: { entry: true },
    })

    result = await createArticleCategories(article)

    result = await createArticlePriorities(article)

    result = await enrichArticleId({ id: article.id })

    logger.debug(
      {
        article: {
          id: article.id,
          title: article.title,
          result: result !== undefined,
        },
      },
      `Successfully persistArticle: ${article.id}`
    )
  } catch (e) {
    logger.error(e, `persistArticle error: ${e.message}`)
    logger.warn(e.stack, 'persistArticle error stack')
  }
}

export const createArticleCategories = async (article) => {
  if (article == undefined) {
    logger.error(`createArticleCategories has undefined article`)
    return
  }

  logger.debug(
    { articleId: article.id },
    `createArticleCategories for article: ${article.id}`
  )

  let categories = article.entry?.document?.categories || []

  if (article.entry?.document?.categories === undefined) {
    logger.warn(
      { articleId: article.id },
      `createArticleCategories missing categories for article: ${article.id}`
    )

    categories = article.tweet?.entry?.document?.categories || []
  }

  let result = undefined

  categories?.map(async (category) => {
    try {
      result = await createArticleCategory({
        articleId: article.id,
        uid: category.id,
        label: category.label,
      })

      logger.debug(
        {
          result,
          articleId: article.id,
          uid: category.id,
          label: category.label,
        },
        'Created createArticleCategory'
      )
    } catch (e) {
      logger.error(e, `createArticleCategory error: ${e.message}`)
      logger.warn(e.stack, 'createArticleCategory error stack')
    }
  })

  return
}

export const createArticleCategory = async ({ articleId, uid, label }) => {
  try {
    const articleCategory = await db.articleCategory.create({
      data: {
        article: {
          connect: { id: articleId },
        },
        uid,
        label,
      },
      include: { article: true },
    })

    return articleCategory
  } catch (e) {
    logger.error(e, `createArticleCategory error: ${e.message}`)
    logger.warn(e.stack, 'createArticleCategory error stack')
    return null
  }
}

export const createArticlePriorities = async (article) => {
  if (article == undefined) {
    logger.error(
      { articleId: undefined }`createArticlePriorities has undefined article`
    )
    return
  }

  logger.debug(
    { articleId: article.id },
    `createArticlePriorities for article: ${article.id}`
  )

  let priorities = article.entry?.document?.priorities || []

  if (article.entry?.document?.priorities === undefined) {
    logger.warn(
      { articleId: article.id },
      `createArticlePriorities missing priorities for article: ${article.id}`
    )

    priorities = article.tweet?.entry?.document?.priorities
  }

  priorities?.map(async (priority) => {
    try {
      const articlePriority = await createArticlePriority({
        articleId: article.id,
        uid: priority.id,
        label: priority.label,
      })

      let result = undefined

      priority.searchTerms?.parts?.forEach(async (term) => {
        const label = term.label || term.text || term.id?.split('/').pop()

        result = await db.articlePriorityTerm.create({
          data: {
            articlePriority: {
              connect: { id: articlePriority.id },
            },
            uid: term.id || 'nlp/f/entity/unknown',
            label: label,
          },
          include: { articlePriority: true },
        })
      })

      logger.debug(result, 'Added articlePriorityTerm')
    } catch (e) {
      logger.error({ e }, `createArticlePriority error: ${e.message}`)
      logger.warn({ stack: e.stack }, 'createArticlePriority error stack')
    }
  })

  return
}

export const createArticlePriority = async ({ articleId, uid, label }) => {
  try {
    const articlePriority = await db.articlePriority.create({
      data: {
        article: {
          connect: { id: articleId },
        },
        uid,
        label,
      },
      include: { article: true },
    })

    return articlePriority
  } catch (e) {
    logger.error(e, `createArticlePriority error: ${e.message}`)
    logger.warn(e.stack, 'createArticlePriority error stack')
    return
  }
}
