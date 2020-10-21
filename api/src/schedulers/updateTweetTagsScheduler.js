import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { logger } from 'src/lib/logger'

const runAt = ({ seconds }) => {
  return addSeconds(Date.now(), Math.ceil(seconds + Math.random() * 10))
}

export const updateTweetTagsScheduler = async ({ tweetId, seconds }) => {
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

  const jobOptions = {
    name: `update-tweet-tags-${tweetId}-job`,
    runAt: runAt({ seconds }),
    endpoint: process.env.UPDATE_TWEET_TAGS_JOB_ENDPOINT,
    verb: 'POST',
    json: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    logger.debug({ jobOptions }, 'Scheduling Update Tweet Tags Job')

    const job = await repeater.enqueueOrUpdate({ ...jobOptions })

    logger.info(job, 'Scheduled Update Tweet Tags Job')
  } catch (e) {
    logger.error(
      { e, ...payload, ...jobOptions },
      'Failed to Schedule Update Tweet Tags Job'
    )
  }

  return
}
