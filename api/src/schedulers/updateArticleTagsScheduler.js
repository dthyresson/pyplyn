import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { logger } from 'src/lib/logger'

const runAt = ({ seconds = 10 }) => {
  return addSeconds(Date.now(), seconds)
}

export const updateArticleTagsScheduler = async ({ articleId, seconds }) => {
  if (articleId === undefined) {
    logger.warn('Tried to schedule article tags without id')
    return
  }

  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const payload = {
    articleId,
  }

  logger.info({ payload }, 'Scheduled Update Article Tags Job payload')

  const token = signPayload({ payload })

  const jobOptions = {
    name: `update-article-tags-${articleId}-job`,
    runAt: runAt({ seconds }),
    endpoint: process.env.UPDATE_ARTICLE_TAGS_JOB_ENDPOINT,
    verb: 'POST',
    json: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    logger.debug({ jobOptions }, 'Scheduling Update Article Tags Job')

    const job = await repeater.enqueueOrUpdate({ ...jobOptions })

    logger.info(job, 'Scheduled Update Article Tags Job')
  } catch (e) {
    logger.error(
      { e, ...payload, ...jobOptions },
      `Failed to Schedule Update Article Tags Job`
    )
  }

  return
}
