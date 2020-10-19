import { logger } from 'src/lib/logger'

import { db } from 'src/lib/db'
import { DocumentType } from '@prisma/client'

import { articleById } from 'src/services/articleQueries'

import { tweetById } from 'src/services/tweetQueries'

import { extractArticle, extractText } from 'src/lib/apiClients/diffbot'

import { articleDataBuilder } from 'src/lib/parsers/articleParser'
import { tweetContextDataBuilder } from 'src/lib/parsers/tweetParser'

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
    logger.error({ article: id }, 'Error in enrichArticleId')
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

  try {
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
      let result = await db.articleContext.create({
        data: {
          article: {
            connect: { id: article.id },
          },
          content,
        },
      })

      logger.debug(
        { result, articleId: article.id, articleUrl: article.url },
        'Enriched article articleContex'
      )

      const data = articleDataBuilder(content)

      logger.debug(
        {
          articleId: article.id,
          articleUrl: article.url,
        },
        `Updating article with enriched info`
      )
      let update = await db.article.update({
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
          update,
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

    let summaries = await createArticleSummaries(article)
    logger.debug({ summaries }, 'createArticleSummaries')

    return db.article.findOne({
      where: { id: article.id },
      include: { articleContext: true, tags: true },
    })
  } catch (e) {
    logger.error({ error: e, articleId: article.id }, 'Error in enrichArticle')
  }
}

export const enrichTweetId = async ({ id }) => {
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

  if (content !== undefined) {
    const tweetUpdate = await db.tweet.update({
      where: { id: tweet.id },
      data: { sentiment: content?.sentiment },
    })

    logger.debug({ tweetUpdate }, 'tweetUpdate')

    const tweetContext = await db.tweetContext.create({
      data: {
        tweet: {
          connect: { id: tweet.id },
        },
        content,
      },
    })
    let result = await enrichTweetContext({ tweetContextId: tweetContext.id })
    logger.debug(result, 'enrichTweetContext')
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
      let result = await db.articleSummary.create({
        data: {
          article: { connect: { id: article.id } },
          sentenceText: summary.text,
          sentenceScore: summary.score || 0,
          sentencePosition: summary.position || 0,
        },
      })

      logger.error(
        { result },
        'Completed createArticleSummaries summary details'
      )
    } catch (e) {
      logger.error({ e, summary }, 'createArticleSummaries error')
    }
  })

  return
}
