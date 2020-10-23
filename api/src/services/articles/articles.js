import { DocumentType, NotificationAction } from '@prisma/client'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { createNotification } from 'src/services/notifications'

import { articleDetailParser, entryParser } from 'src/lib/parsers/entryParser'
import { enrichArticleScheduler } from 'src/schedulers/enrichArticleScheduler'

export const articles = () => {
  return db.article.findMany()
}

export const createArticleFromEntry = async (entry) => {
  const parsedEntry = entryParser(entry)
  const parsedArticle = articleDetailParser(entry)

  logger.debug({ uid: parsedEntry.uid }, `parsedEntry entry: ${entry.id}`)
  logger.debug({ parsedArticle }, `parsedArticle for entry: ${entry.id}`)

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

  logger.debug(
    { article: { id: article.id, title: article.title } },
    `Successfully createArticleFromEntry: ${article.id}`
  )

  const _resultEnrichArticle = await enrichArticleScheduler({
    articleId: article.id,
    seconds: 40,
  })

  logger.debug(
    { article: { id: article.id, title: article.title } },
    `Scheduling article enrichment: ${article.id}`
  )

  try {
    const notification = await createNotification({
      input: {
        documentType: DocumentType.ARTICLE,
        action: NotificationAction.CREATE,
        message: article.title,
        article: { connect: { id: article.id } },
      },
    })

    logger.debug(
      { notification, article: { id: article.id, title: article.title } },
      `Successfully added Article notification: ${article.id}`
    )
  } catch (e) {
    logger.debug(
      { e, article: { id: article.id, title: article.title } },
      `Error adding Article notification: ${article.id}`
    )
  }

  return article
}

export const createArticleLinkedArticle = async (linkedArticle) => {
  logger.debug(
    { uid: linkedArticle.id, documentType: DocumentType.ARTICLE },
    `Invoking createArticleLinkedArticle: ${linkedArticle.id}`
  )

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
    { article: { id: article.id, title: article.title } },
    `Successfully createArticleFromEntry: ${article.id}`
  )

  const _resultEnrichArticle = await enrichArticleScheduler({
    articleId: article.id,
    seconds: 40,
  })

  logger.debug(
    { article: { id: article.id, title: article.title } },
    `Scheduling article enrichment: ${article.id}`
  )

  try {
    const notification = await createNotification({
      input: {
        documentType: DocumentType.ARTICLE,
        action: NotificationAction.CREATE,
        message: article.title,
        article: { connect: { id: article.id } },
      },
    })

    logger.debug(
      { notification, article: { id: article.id, title: article.title } },
      `Successfully added Article notification: ${article.id}`
    )
  } catch (e) {
    logger.debug(
      { e, article: { id: article.id, title: article.title } },
      `Error adding Article notification: ${article.id}`
    )
  }

  return article
}

export const Article = {
  entry: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).entry(),
  articleContext: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).articleContext(),
  tags: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).tags(),
  tweets: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).tweets(),
  articleCategories: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).articleCategories(),
  summaries: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).summaries(),
  articlePriorities: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).articlePriorities(),
}
