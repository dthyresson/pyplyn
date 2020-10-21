import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { logger } from 'src/lib/logger'

const runAt = () => {
  return addSeconds(Date.now(), Math.ceil(10 * (Math.random() * 10)))
}

export const enrichArticleScheduler = async ({ articleId }) => {
  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const payload = {
    articleId,
  }

  logger.info({ payload }, 'Scheduled Enrich Article Job payload')

  const token = signPayload({ payload })

  try {
    const job = await repeater.enqueueOrUpdate({
      name: `enrich-article-${articleId}-job`,
      runAt: runAt(),
      endpoint: process.env.ENRICH_ARTICLE_JOB_ENDPOINT,
      verb: 'POST',
      json: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    logger.info(job, 'Scheduled Enrich Article Job')
  } catch (e) {
    logger.error({ e, ...payload }, `Failed to Schedule Enrich Article Job`)
  }

  return
}
