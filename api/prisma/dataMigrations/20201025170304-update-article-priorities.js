import { createArticlePriorities } from '../../dist/services/articleServices'
import { logger } from '../../dist/lib/logger'
import { backOff } from 'exponential-backoff'
import delay from 'delay'

export default async ({ db }) => {
  let skip = 0
  const take = 50

  let nextBatch = true

  while (nextBatch) {
    console.log(skip)
    const articles = await db.article.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        articlePriorities: true,
        entry: true,
      },
    })

    console.log(articles.length)

    if (articles && articles.length > 0) {
      console.log(articles.length)
      await delay(500)
      articles.forEach(async (article) => {
        if (article.articlePriorities.length === 0) {
          console.log(article.id)
          logger.info(article.id)

          try {
            await delay(3500)
            const result = await backOff(
              () => createArticlePriorities(article),
              {
                delayFirstAttempt: true,
                numOfAttempts: 10,
                startingDelay: 2000,
                jitter: 'full',
                timeMultiple: 3,
              }
            )

            logger.debug(result)
            return result
          } catch (e) {
            logger.error(article.id)
            logger.error(e)
          }
        }
      })

      skip = skip + take
    } else {
      nextBatch = false
    }
  }
}
