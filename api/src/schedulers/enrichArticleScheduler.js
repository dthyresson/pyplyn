import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { logger } from 'src/lib/logger'

const runAt = (seconds = 10) => {
  return addSeconds(Date.now(), Math.ceil(seconds + Math.random() * 10))
}

export const enrichArticleScheduler = async ({ articleId, seconds = 10 }) => {
  if (articleId === undefined) {
    logger.warn('Tried to schedule article enrichment without id')
    return
  }

  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const payload = {
    articleId,
  }

  logger.info({ payload }, 'Scheduled Enrich Article Job payload')

  const token = signPayload({ payload })
  const jobOptions = {
    name: `enrich-article-${articleId}-job`,
    runAt: runAt({ seconds }),
    endpoint: process.env.ENRICH_ARTICLE_JOB_ENDPOINT,
    verb: 'POST',
    json: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    logger.debug({ jobOptions }, 'Scheduling Enrich Article Job')

    const job = await repeater.enqueueOrUpdate({ ...jobOptions })

    logger.info(job, 'Scheduled Enrich Article Job')
  } catch (e) {
    logger.error(
      { e, ...payload, ...jobOptions },
      `Failed to Schedule Enrich Article Job`
    )
  }

  return
}
