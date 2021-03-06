import { toDate } from 'date-fns'

import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'

import { createArticleFromEntry } from 'src/services/articles'
import { articleById } from 'src/services/articleQueries'

export const persistArticle = async ({ entry }) => {
  try {
    logger.debug(
      { entryId: entry.id, documumentType: entry.DocumentType },
      `persistArticle for entry: ${entry.id}`
    )

    let article = undefined

    try {
      article = await createArticleFromEntry(entry)

      logger.debug(
        { id: article.id },
        `Successfully persistArticle created article for entry: ${entry.id}`
      )
    } catch (e) {
      logger.warn(
        { error: e.message, entry: entry.id },
        'Entry already associated to article'
      )

      if (article !== undefined) {
        logger.debug(
          { entryId: entry.id, articleId: article.id },
          'Found article associated with entry'
        )
      } else {
        return article
      }
    }

    const resultArticleCategories = await createArticleCategories(article)

    logger.debug(
      {
        article: {
          id: article?.id,
          title: article?.title,
        },
        resultArticleCategories,
      },
      `Successfully createArticleCategories: ${article?.id}`
    )

    const resultArticlePriorities = await createArticlePriorities(article)

    logger.debug(
      {
        article: {
          id: article?.id,
          title: article?.title,
        },
        resultArticlePriorities,
      },
      `Successfully createArticlePriorities: ${article?.id}`
    )

    logger.debug(
      {
        article: {
          id: article?.id,
          title: article?.title,
        },
      },
      `Successfully persistArticle: ${article?.id}`
    )
  } catch (e) {
    logger.error(e, `persistArticle error: ${e.message}`)
    logger.warn(e.stack, 'persistArticle error stack')
  }
}

export const persistArticleCategories = async ({ id }) => {
  logger.debug(
    { articleId: id },
    `persistArticleCategories for articleId: ${id}`
  )

  const article = await articleById({ id: id })

  if (article == undefined) {
    logger.warn(`persistArticleCategories has undefined article for id ${id}`)
  }

  const result = await createArticleCategories(article)

  return result
}

export const createArticleCategories = async (article) => {
  if (article === undefined) {
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

  categories?.map(async (category) => {
    try {
      const result = await createArticleCategory({
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

  return true
}

export const createArticleCategory = async ({ articleId, uid, label }) => {
  try {
    const articleCategory = await db.articleCategory.upsert({
      where: { articleId_uid_label: { articleId, uid, label } },
      create: {
        article: {
          connect: { id: articleId },
        },
        uid,
        label,
      },
      update: { uid, label, updatedAt: toDate(Date.now()) },
      include: { article: true },
    })

    return articleCategory
  } catch (e) {
    logger.error(e, `createArticleCategory error: ${e.message}`)
    logger.warn(e.stack, 'createArticleCategory error stack')
    return null
  }
}

export const persistArticlePriorities = async ({ id }) => {
  logger.debug(
    { articleId: id },
    `persistArticlePriorities for articleId: ${id}`
  )

  const article = await articleById({ id: id })

  if (article == undefined) {
    logger.warn(
      { articleId: id },
      `persistArticlePriorities has undefined article for id ${id}`
    )
  }

  const priorities = await createArticlePriorities(article)

  return priorities
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

        result = await db.articlePriorityTerm.upsert({
          where: {
            articlePriorityId_uid_label: {
              articlePriorityId: articlePriority.id,
              uid: term.id || 'nlp/f/entity/unknown',
              label: label,
            },
          },

          create: {
            articlePriority: {
              connect: { id: articlePriority.id },
            },
            uid: term.id || 'nlp/f/entity/unknown',
            label: label,
          },

          update: {
            uid: term.id || 'nlp/f/entity/unknown',
            label: label,
            updatedAt: toDate(Date.now()),
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

  return true
}

export const createArticlePriority = async ({ articleId, uid, label }) => {
  try {
    const articlePriority = await db.articlePriority.upsert({
      where: { articleId_uid_label: { articleId, uid, label } },
      create: {
        article: {
          connect: { id: articleId },
        },
        uid,
        label,
      },
      update: { uid, label, updatedAt: toDate(Date.now()) },
      include: { article: true },
    })

    return articlePriority
  } catch (e) {
    logger.error(e, `createArticlePriority error: ${e.message}`)
    logger.warn(e.stack, 'createArticlePriority error stack')
    return
  }
}
