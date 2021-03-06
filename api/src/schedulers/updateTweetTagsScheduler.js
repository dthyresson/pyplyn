import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { jitter } from 'src/lib/jitter'

import { logger } from 'src/lib/logger'

const runAt = ({ seconds = 10 }) => {
  return addSeconds(Date.now(), jitter({ seconds }))
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

  logger.info({ payload }, `Building Update Tweet Tags Job Payload: ${tweetId}`)

  const token = signPayload({ payload })

  const jobOptions = {
    name: `update-tweet-tags-${tweetId}-${seconds}-job`,
    runAt: runAt({ seconds }),
    endpoint: process.env.UPDATE_TWEET_TAGS_JOB_ENDPOINT,
    verb: 'POST',
    json: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    logger.debug({ jobOptions }, `Scheduling Update Tweet Tags Job: ${tweetId}`)

    const job = await repeater.enqueueOrUpdate({ ...jobOptions })

    logger.info(job, `Scheduled Update Tweet Tags Job: ${tweetId}`)
  } catch (e) {
    logger.error(
      { e, ...payload, ...jobOptions },
      `Failed to Schedule Update Tweet Tags Job: ${tweetId}`
    )
  }

  return tweetId
}
