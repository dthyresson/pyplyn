import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'
import { jitter } from 'src/lib/jitter'

import { logger } from 'src/lib/logger'

const runAt = ({ seconds = 45 }) => {
  return addSeconds(Date.now(), jitter({ seconds }))
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

  logger.info(
    { payload },
    `Building Update Article Tags Job payload: ${articleId}`
  )

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
    logger.debug(
      { jobOptions },
      `Scheduling Update Article Tags Job: ${articleId}`
    )

    const job = await repeater.enqueueOrUpdate({ ...jobOptions })

    logger.info(job, `Scheduled Update Article Tags Job: ${articleId}`)
  } catch (e) {
    logger.error(
      { e, ...payload, ...jobOptions },
      `Failed to Schedule Update Article Tags Job: ${articleId}`
    )
  }

  return articleId
}
