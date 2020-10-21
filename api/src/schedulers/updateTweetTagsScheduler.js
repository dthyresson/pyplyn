import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { logger } from 'src/lib/logger'

const runAt = () => {
  return addSeconds(Date.now(), Math.ceil(10 * (Math.random() * 10)))
}

export const updateTweetTagsScheduler = async ({ tweetId }) => {
  if (tweetId === undefined) {
    logger.warn('Tried to schedule tweet tags without id')
    return
  }

  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const payload = {
    tweetId,
  }

  logger.info({ payload }, 'Scheduled Update Tweet Tags Job payload')

  const token = signPayload({ payload })

  try {
    const job = await repeater.enqueueOrUpdate({
      name: `update-tweet-tags-${tweetId}-job`,
      runAt: runAt(),
      endpoint: process.env.UPDATE_TWEET_TAGS_JOB_ENDPOINT,
      verb: 'POST',
      json: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    logger.info(job, 'Scheduled Update Tweet Tags Job')
  } catch (e) {
    logger.error({ e, ...payload }, `Failed to Schedule Update Tweet Tags Job`)
  }

  return
}
