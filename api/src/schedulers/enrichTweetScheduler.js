import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { logger } from 'src/lib/logger'

const runAt = () => {
  return addSeconds(Date.now(), Math.ceil(10 * (Math.random() * 10)))
}

export const enrichTweetScheduler = async ({ tweetId }) => {
  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const payload = {
    tweetId,
  }

  logger.info({ payload }, 'Scheduled Enrich Tweet Job payload')

  const token = signPayload({ payload })

  try {
    const job = await repeater.enqueueOrUpdate({
      name: `enrich-tweet-${tweetId}-job`,
      runAt: runAt(),
      endpoint: process.env.ENRICH_TWEET_JOB_ENDPOINT,
      verb: 'POST',
      json: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    logger.info(job, 'Scheduled Enrich Tweet Job')
  } catch (e) {
    logger.error({ e, ...payload }, `Failed to Schedule Enrich Tweet Job`)
  }

  return
}
