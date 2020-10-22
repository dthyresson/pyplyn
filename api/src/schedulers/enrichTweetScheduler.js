import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { updateTweetTagsScheduler } from 'src/schedulers/updateTweetTagsScheduler'

import { logger } from 'src/lib/logger'

const runAt = ({ seconds = 10 }) => {
  return addSeconds(Date.now(), seconds)
}

export const enrichTweetScheduler = async ({ tweetId, seconds = 10 }) => {
  if (tweetId === undefined) {
    logger.warn('Tried to schedule tweet enrichment without id')
    return
  }

  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const payload = {
    tweetId,
  }

  logger.info({ payload }, 'Scheduled Enrich Tweet Job payload')

  const token = signPayload({ payload })

  const jobOptions = {
    name: `enrich-tweet-${tweetId}-job`,
    runAt: runAt({ seconds }),
    endpoint: process.env.ENRICH_TWEET_JOB_ENDPOINT,
    verb: 'POST',
    json: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    logger.debug({ jobOptions }, 'Scheduling Enrich Tweet Job')

    const job = await repeater.enqueueOrUpdate({ ...jobOptions })

    logger.info(job, 'Scheduled Enrich Tweet Job')
  } catch (e) {
    logger.error(
      { error: e, message: e.message, ...payload, ...jobOptions },
      'Failed to Schedule Enrich Tweet Job'
    )
  }

  const updateTweetTags = await updateTweetTagsScheduler({
    tweetId: tweetId,
    seconds: 30,
  })

  logger.debug(
    {
      tweetId,
      updateTweetTags,
    },
    `Successfully scheduled updateTweetTags: ${tweetId}`
  )

  return
}
