import { logger } from 'src/lib/logger'

import { db } from 'src/lib/db'
import { DocumentType } from '@prisma/client'

import { articleById } from 'src/services/articleQueries'

import { tweetById } from 'src/services/tweetQueries'

import { extractArticle, extractText } from 'src/lib/apiClients/diffbot'

import { articleDataBuilder } from 'src/lib/parsers/articleParser'
import { tweetContextDataBuilder } from 'src/lib/parsers/tweetParser'

export const enrichArticleId = async ({ id }) => {
  const article = await articleById({ id: id })
  return await enrichArticle(article)
}

export const enrichArticle = async (article) => {
  logger.info(
    {
      articleId: article.id,
      articleUrl: article.url,
    },
    `Enriching article ${article.url}`
  )

  // TODO: This is the super long running task
  const content = await extractArticle({
    url: article.url,
  })

  if (content !== undefined) {
    logger.debug(
      {
        articleId: article.id,
        articleUrl: article.url,
      },
      `Enriching article articleContext`
    )
    await db.articleContext.create({
      data: {
        article: {
          connect: { id: article.id },
        },
        content,
      },
    })

    const data = articleDataBuilder(content)

    logger.debug(
      {
        articleId: article.id,
        articleUrl: article.url,
      },
      `Updating article with enriched info`
    )
    await db.article.update({
      where: { id: article.id },
      data: {
        articleText: data.articleText,
        author: data.author,
        description: data.description,
        language: data.language,
        sentiment: data.sentiment,
        siteName: data.siteName,
        tagLabels: { set: data.tagLabels },
      },
    })

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

      const t = await db.tag.create({
        data: {
          article: { connect: { id: article.id } },
          documentType: DocumentType.ARTICLE,
          label: tag.label,
          uri: tag.uri || tag.label,
          mentions: tag.count,
          confidence: tag.score,
          dbpediaUris: { set: tag.rdfTypes || [] },
          rdfTypes: { set: tag.rdfTypes || [] },
          entityTypes: { set: entityTypes || [] },
          sentiment: tag.sentiment,
        },
      })

      logger.info(t, `Created tag ${t.label} for articleId ${article.id} `)
    })
  }

  await createArticleSummaries(article)

  return db.article.findOne({
    where: { id: article.id },
    include: { articleContext: true, tags: true },
  })
}

export const enrichTweetId = async ({ id }) => {
  const tweet = await tweetById({ id: id })
  return await enrichTweet(tweet)
}

export const enrichTweet = async (tweet) => {
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

  if (content !== undefined) {
    await db.tweet.update({
      where: { id: tweet.id },
      data: { sentiment: content.sentiment },
    })

    const tweetContext = await db.tweetContext.create({
      data: {
        tweet: {
          connect: { id: tweet.id },
        },
        content,
      },
    })
    await enrichTweetContext({ tweetContextId: tweetContext.id })
  }

  return
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
      const t = await db.tag.create({
        data: {
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
      })

      logger.debug(
        t,
        `Created tag ${t.label} for tweetId ${tweetContext.tweetId} `
      )
    } catch (e) {
      logger.error(
        e,
        `Error creating tag ${tag.label} for tweetId ${tweetContext.tweetId} `
      )
    }
  })
}

export const createArticleSummaries = async (article) => {
  if (article == undefined) {
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
      `createArticlePriorities missing summary for article: ${article.id}`
    )
  }

  article.entry?.document?.leoSummary?.sentences.forEach(async (summary) => {
    try {
      await db.articleSummary.create({
        data: {
          sentenceText: summary.text,
          sentenceScore: summary.score || 0,
          sentencePostion: summary.position || 0,
        },
        connect: { article: { id: article.id } },
      })
    } catch (e) {
      logger.error({ e }, 'createArticlePriorities error')
    }
  })

  return
}
