import { db } from 'src/lib/db'
import { DocumentType } from '@prisma/client'

import { extractArticle, extractText } from 'src/lib/apiClients/diffbot'

import { articleDataBuilder } from 'src/lib/parsers/articleParser'
import { tweetContextDataBuilder } from 'src/lib/parsers/tweetParser'

export const enrichArticle = async (article) => {
  const content = await extractArticle({
    url: article.url,
  })

  if (content !== undefined) {
    await db.articleContext.create({
      data: {
        article: {
          connect: { id: article.id },
        },
        content,
      },
    })

    const data = articleDataBuilder(content)

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

    data.tags?.forEach(async (tag) => {
      await db.tag.create({
        data: {
          article: { connect: { id: article.id } },
          documentType: DocumentType.ARTICLE,
          label: tag.label,
          uri: tag.uri || tag.label,
          mentions: tag.count,
          confidence: tag.score,
          rdfTypes: { set: tag.rdfTypes || [''] },
          sentiment: tag.sentiment,
        },
      })
    })
  }

  return db.article.findOne({
    where: { id: article.id },
    include: { articleContext: true, tags: true },
  })
}

export const enrichTweet = async (tweet) => {
  const content = await extractText({
    content: tweet.content,
    lang: 'en',
  })

  if (content !== undefined) {
    await db.tweet.update({
      where: { id: tweet.id },
      data: { sentiment: content.sentiment },
    })

    await db.tweetContext.create({
      data: {
        tweet: {
          connect: { id: tweet.id },
        },
        content,
      },
    })

    const data = tweetContextDataBuilder(content)

    data?.tags?.forEach(async (tag) => {
      await db.tag.create({
        data: {
          tweet: { connect: { id: tweet.id } },
          documentType: DocumentType.TWEET,

          label: tag.label,
          uri: tag.uri,
          diffbotUris: { set: tag.diffbotUris || [''] },
          dbpediaUris: { set: tag.dbpediaUris || [''] },
          rdfTypes: { set: tag.rdfTypes || [''] },
          entityTypes: { set: tag.entityTypes || [''] },
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
    })
  }

  return tweet
}
