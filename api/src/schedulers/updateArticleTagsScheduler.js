import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { logger } from 'src/lib/logger'

const runAt = () => {
  return addSeconds(Date.now(), Math.ceil(10 * (Math.random() * 10)))
}

export const updateArticleTagsScheduler = async ({ articleId }) => {
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

  try {
    const job = await repeater.enqueueOrUpdate({
      name: `update-article-yags-${articleId}-job`,
      runAt: runAt(),
      endpoint: process.env.UPDATE_ARTICLE_TAGS_JOB_ENDPOINT,
      verb: 'POST',
      json: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    logger.info(job, 'Scheduled Update Article Tags Job')
  } catch (e) {
    logger.error(
      { e, ...payload },
      `Failed to Schedule Update Article Tags Job`
    )
  }

  return
}
