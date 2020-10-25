// import { backOff } from 'exponential-backoff'
import delay from 'delay'

import { DocumentType } from '@prisma/client'

import { tweetContextDataBuilder } from '../../dist/lib/parsers/tweetParser'

import { logger } from '../../dist/lib/logger'

export default async ({ db }) => {
  let skip = 0
  const take = 50

  let nextBatch = true

  while (nextBatch) {
    console.log(skip)
    const tweets = await db.tweet.findMany({
      skip,
      take,
      orderBy: { createdAt: 'asc' },
      include: {
        tweetContext: true,
        tags: true,
        entry: true,
      },
    })

    console.log(tweets.length)

    if (tweets && tweets.length > 0) {
      console.log(tweets.length)
      await delay(5000)
      tweets.forEach(async (tweet) => {
        if (tweet.tags.length === 0) {
          console.log(tweet.id)

          logger.info(tweet.id)

          try {
            await delay(3500)

            const data = tweetContextDataBuilder(tweet.tweetContext.content)

            data.tags?.forEach(async (tag) => {
              await delay(500)

              const t = await db.tag.upsert({
                where: {
                  documentType_articleId_tweetId_uri: {
                    documentType: DocumentType.TWEET,
                    tweetId: tweet.id,
                    articleId: '',
                    uri: tag.uri,
                  },
                },
                create: {
                  tweet: { connect: { id: tweet.id } },
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

              logger.debug(t)
              return t
            })
          } catch (e) {
            logger.error(tweet.id)
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
