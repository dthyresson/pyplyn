// import { backOff } from 'exponential-backoff'
import delay from 'delay'
import { toDate } from 'date-fns'

import { DocumentType } from '@prisma/client'

import { extractArticle } from '../../dist/lib/apiClients/diffbot'

import { articleDataBuilder } from '../../dist/lib/parsers/articleParser'

import { logger } from '../../dist/lib/logger'

export default async ({ db }) => {
  let skip = 0
  const take = 20

  let nextBatch = true

  while (nextBatch) {
    //console.log(skip)
    const articles = await db.article.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        articleContext: true,
        tags: true,
        entry: true,
      },
    })

    //console.log(articles.length)

    if (articles && articles.length > 0) {
      //console.log(articles.length)
      await delay(2000)
      articles.forEach(async (article) => {
        if (article.tags.length === 0) {
          //// console.log(article.id)
          //// console.log(article.articleContext?.content)

          logger.info(article.id)

          try {
            await delay(3000)

            let content = article.articleContext?.content

            if (content === undefined) {
              await delay(5000)

              content = await extractArticle({
                url: article.url,
              })

              if (content === undefined && content !== null) {
                logger.warn(
                  { articleId: article.id },
                  `Unable to extract content for ${article.id}`
                )
              } else {
                await delay(1500)

                const _result = await db.articleContext.upsert({
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
                  { articleId: article.id },
                  `Saved context content for ${article.id}`
                )
              }
            }

            const data = articleDataBuilder(content)

            data?.tags?.forEach(async (tag) => {
              await delay(2500)
              //console.log(`upsert ${article.id}`)

              const entityTypes = tag.rdfTypes
                ?.map((t) => {
                  return t.split('/').pop().toLowerCase()
                })
                .filter((x) => x !== undefined)

              await delay(1000)

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

              logger.debug(t)
              return t
            })
          } catch (e) {
            logger.error(article.id)
            logger.error(e.message)
          }
        }
      })

      skip = skip + take
    } else {
      nextBatch = false
    }
  }
}
