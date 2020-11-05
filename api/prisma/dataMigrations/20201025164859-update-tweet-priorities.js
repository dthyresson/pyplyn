import { createTweetPriorities } from '../../dist/services/tweetServices'
import { logger } from '../../dist/lib/logger'
import { backOff } from 'exponential-backoff'
import delay from 'delay'

export default async ({ db }) => {
  let skip = 0
  const take = 50

  let nextBatch = true

  while (nextBatch) {
    //console.log(skip)
    const tweets = await db.tweet.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        tweetPriorities: true,
        entry: true,
      },
    })

    //console.log(tweets.length)

    if (tweets && tweets.length > 0) {
      //console.log(tweets.length)
      await delay(5000)
      tweets.forEach(async (tweet) => {
        if (tweet.tweetPriorities.length === 0) {
          //console.log(tweet.id)

          logger.info(tweet.id)

          try {
            await delay(3500)
            const result = await backOff(() => createTweetPriorities(tweet), {
              delayFirstAttempt: true,
              numOfAttempts: 10,
              startingDelay: 2000,
              jitter: 'full',
              timeMultiple: 3,
            })

            logger.debug(result)
            return result
          } catch (e) {
            logger.error(tweet.id)
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
