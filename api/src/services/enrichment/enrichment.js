import { toDate } from 'date-fns'
import { logger } from 'src/lib/logger'

import { db } from 'src/lib/db'
import { DocumentType, NotificationAction } from '@prisma/client'

import { articleById } from 'src/services/articleQueries'

import { tweetById } from 'src/services/tweetQueries'

import { extractArticle, extractText } from 'src/lib/apiClients/diffbot'

import { articleDataBuilder } from 'src/lib/parsers/articleParser'
import { tweetContextDataBuilder } from 'src/lib/parsers/tweetParser'

import { createNotification } from 'src/services/notifications'

export const enrichArticleId = async ({ id }) => {
  logger.info(
    {
      articleId: id,
    },
    `Enriching enrichArticleId ${id}`
  )

  try {
    const article = await articleById({ id: id })

    logger.debug(
      {
        articleId: article?.id,
        title: article?.title,
      },
      `Fetched article for enrichArticleId ${id}`
    )

    const result = await enrichArticle(article)

    logger.debug(
      {
        articleId: article.id,
        title: article.title,
      },
      `Completed enrichArticleId ${id}`
    )

    return result
  } catch (e) {
    logger.error({ e, article: id }, 'Error in enrichArticleId')
  }
}

export const enrichArticle = async (article) => {
  if (article === undefined) {
    logger.error('enrichArticle article undefined')
    return
  }

  logger.info(
    {
      articleId: article?.id,
      articleUrl: article?.url,
    },
    `Enriching article ${article?.url}`
  )

  const content = await extractArticle({
    url: article.url,
  })

  if (content === undefined) {
    logger.warn(
      {
        articleId: article.id,
        articleUrl: article.url,
      },
      'Missing extracted text for article to create articleContext'
    )
  }

  if (content !== undefined) {
    logger.debug(
      {
        articleId: article.id,
        articleUrl: article.url,
        content,
      },
      `Enriching article articleContext`
    )

    try {
      const notification = await createNotification({
        input: {
          documentType: DocumentType.ARTICLE,
          action: NotificationAction.UPDATE,
          message: article.title,
          article: { connect: { id: article.id } },
        },
      })

      logger.debug(
        { notification, article: { id: article.id, title: article.title } },
        `Successfully added Article notification: ${article.id}`
      )
    } catch (e) {
      console.log(e)
      logger.error(
        {
          e,
          article: { id: article.id, title: article.title },
        }`Error adding Article notification: ${article.id}`
      )
    }

    try {
      let result = await db.articleContext.upsert({
        where: { articleId: article.id },
        create: {
          article: {
            connect: { id: article.id },
          },
          content,
        },
        update: { updatedAt: toDate(Date.now()) },
      })

      logger.debug(
        { result, articleId: article.id, articleUrl: article.url },
        'Enriched article articleContext'
      )
    } catch (e) {
      logger.warn(
        { id: article.id },
        'Could not save Article Context. It could already exist.'
      )
    }
  }

  const data = articleDataBuilder(content)

  if (data === undefined) {
    logger.warn({ id: article.id, content }, 'Missing articleDataBuilder data')
    return
  }

  try {
    logger.debug(
      {
        articleId: article.id,
        articleUrl: article.url,
      },
      `Updating article with enriched info`
    )
    const result = await db.article.update({
      where: { id: article.id },
      data: {
        articleText: data.articleText,
        author: data.author,
        description: data.description,
        language: data.language,
        sentiment: data.sentiment,
        siteName: data.siteName,
        tagLabels: { set: data.tagLabels },
        updatedAt: toDate(toDate(Date.now())),
      },
    })
    logger.debug(
      {
        articleId: article.id,
        articleUrl: article.url,
        result,
      },
      `Updated article after enrichment`
    )
  } catch (e) {
    logger.error(
      {
        error: e.message,
        articleId: article.id,
        articleUrl: article.url,
      },
      `Error updating article after enrichment`
    )
  }

  try {
    logger.debug(
      {
        articleId: article.id,
        articleUrl: article.url,
      },
      `Enriching article tags`
    )

    data.tags?.forEach(async (tag) => {
      const entityTypes = tag.rdfTypes
        ?.map((t) => {
          return t.split('/').pop().toLowerCase()
        })
        .filter((x) => x !== undefined)

      logger.debug(
        {
          articleId: article.id,
          articleUrl: article.url,
          tag,
        },
        `Enriching tag ${tag.label} to article ${article.id}`
      )

      const t = await db.tag.upsert({
        where: {
          documentType_articleId_tweetId_uri: {
            documentType: DocumentType.ARTICLE,
            articleId: article.id,
            tweetId: '',
            uri: tag.uri || tag.label,
          },
        },
        create: {
          article: { connect: { id: article.id } },
          documentType: DocumentType.ARTICLE,

          label: tag.label,
          uri: tag.uri || tag.label,
          diffbotUris: { set: tag.diffbotUris || [] },
          dbpediaUris: { set: tag.dbpediaUris || [] },
          rdfTypes: { set: tag.rdfTypes || [] },
          entityTypes: { set: entityTypes || [] },
          mentions: tag.mentions,
          confidence: tag.confidence,
          salience: tag.salience,
          sentiment: tag.sentiment,
          hasLocation: tag.hasLocation,
          latitude: tag.latitude,
          longitude: tag.longitude,
          precision: tag.precision,
        },
        update: {
          rdfTypes: { set: tag.rdfTypes || [] },
          entityTypes: { set: entityTypes || [] },
          mentions: tag.mentions,
        },
      })

      logger.info(t, `Created tag ${t.label} for articleId ${article.id} `)
    })
  } catch (e) {
    logger.warn(
      { error: e.message, articleId: article.id },
      'Unable to create article tags'
    )
  }

  try {
    let summaries = await createArticleSummaries(article)
    logger.debug({ summaries }, 'createArticleSummaries')

    return await db.article.findOne({
      where: { id: article.id },
      include: { articleContext: true, tags: true },
    })
  } catch (e) {
    logger.error(
      { error: e, articleId: article.id },
      'Error in createArticleSummaries'
    )
  }
}

export const enrichTweetId = async ({ id }) => {
  logger.info(
    {
      tweetId: id,
    },
    `Enriching enrichTweetId ${id}`
  )

  const tweet = await tweetById({ id: id })
  const result = await enrichTweet(tweet)
  return result
}

export const enrichTweet = async (tweet) => {
  if (tweet === undefined) {
    logger.error('enrichTweet tweet undefined')
    return
  }

  logger.info(
    {
      tweetId: tweet.id,
      tweetContent: tweet.content,
    },
    'Enriching tweet'
  )

  const content = await extractText({
    content: tweet.content,
    lang: 'en',
  })

  if (content === undefined) {
    logger.warn(
      {
        tweetId: tweet.id,
        tweetContent: tweet.content,
      },
      'Missing extracted text for tweet to create tweetContext'
    )
  }

  if (content !== undefined) {
    const tweetUpdate = await db.tweet.update({
      where: { id: tweet.id },
      data: {
        sentiment: content?.sentiment,
        updatedAt: toDate(toDate(Date.now())),
      },
    })

    logger.debug({ tweetUpdate }, 'tweetUpdate')

    try {
      const notification = await createNotification({
        input: {
          documentType: DocumentType.TWEET,
          action: NotificationAction.UPDATE,
          message: tweet.title,
          tweet: { connect: { id: tweet.id } },
        },
      })

      logger.debug(
        { notification, tweet: { id: tweet.id, title: tweet.title } },
        `Successfully added Tweet notification: ${tweet.id}`
      )
    } catch (e) {
      console.log(e)
      logger.error(
        { e, tweet: { id: tweet.id, title: tweet.title } },
        `Error adding Tweet notification: ${tweet.id}`
      )
    }

    try {
      const tweetContext = await db.tweetContext.upsert({
        where: { tweetId: tweet.id },
        create: {
          tweet: {
            connect: { id: tweet.id },
          },
          content,
        },
        update: { updatedAt: toDate(Date.now()) },
      })

      const result = await enrichTweetContext({
        tweetContextId: tweetContext.id,
      })
      logger.debug(result, 'enrichTweetContext')
    } catch (e) {
      logger.warn(
        { error: { e, message: e.message }, tweetId: tweet.id },
        'Could not save Tweet context. Could be that it already exists.'
      )
    }
  }

  return content
}

export const enrichTweetContext = async ({ tweetContextId }) => {
  if (tweetContextId == undefined) {
    logger.error('enrichTweetContext missing tweetContextId')
    return
  }

  const tweetContext = await db.tweetContext.findOne({
    where: { id: tweetContextId },
  })

  if (tweetContext == undefined) {
    logger.error('enrichTweetContext missing tweetContext')
    return
  }

  const data = tweetContextDataBuilder(tweetContext.content)

  data?.tags?.forEach(async (tag) => {
    logger.info(
      {
        tag: tag.label,
        tweetId: tweetContext.tweetId,
      },
      `Adding tag ${tag.label} to tweet`
    )

    try {
      const t = await db.tag.upsert({
        where: {
          documentType_articleId_tweetId_uri: {
            documentType: DocumentType.TWEET,
            tweetId: tweetContext.tweetId,
            articleId: '',
            uri: tag.uri,
          },
        },
        create: {
          tweet: { connect: { id: tweetContext.tweetId } },
          documentType: DocumentType.TWEET,

          label: tag.label,
          uri: tag.uri,
          diffbotUris: { set: tag.diffbotUris || [] },
          dbpediaUris: { set: tag.dbpediaUris || [] },
          rdfTypes: { set: tag.rdfTypes || [] },
          entityTypes: { set: tag.entityTypes || [] },
          mentions: tag.mentions,
          confidence: tag.confidence,
          salience: tag.salience,
          sentiment: tag.sentiment,
          hasLocation: tag.hasLocation,
          latitude: tag.latitude,
          longitude: tag.longitude,
          precision: tag.precision,
        },
        update: { mentions: tag.mentions },
      })

      logger.debug(
        t,
        `Created tag ${t.label} for tweetId ${tweetContext.tweetId} `
      )
    } catch (e) {
      logger.error(
        { e, tag },
        `Error creating tag ${tag.label} for tweetId ${tweetContext.tweetId} `
      )
    }
  })
}

export const createArticleSummaries = async (article) => {
  if (article === undefined) {
    logger.error(
      { articleId: undefined }`createArticleSummaries has undefined article`
    )
    return
  }

  logger.debug(
    { articleId: article.id },
    `createArticleSummaries for article: ${article.id}`
  )

  if (article.entry?.document?.leoSummary === undefined) {
    logger.warn(
      { articleId: article.id },
      `createArticleSummaries missing summary for article: ${article.id}`
    )
  }

  article.entry?.document?.leoSummary?.sentences?.forEach(async (summary) => {
    logger.debug(summary, 'createArticleSummaries summary details')

    try {
      let result = await db.articleSummary.upsert({
        where: {
          articleId_sentenceText: {
            articleId: article.id,
            sentenceText: summary.text,
          },
        },
        create: {
          article: { connect: { id: article.id } },
          sentenceText: summary.text,
          sentenceScore: summary.score || 0,
          sentencePosition: summary.position || 0,
        },
        update: { updatedAt: toDate(Date.now()) },
      })

      logger.debug(
        { result },
        'Completed createArticleSummaries summary details'
      )
    } catch (e) {
      console.log(e)
      logger.error({ e, summary }, 'createArticleSummaries error')
    }
  })

  return
}
