import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { updateArticleTagsScheduler } from 'src/schedulers/updateArticleTagsScheduler'
import { jitter } from 'src/lib/jitter'

import { logger } from 'src/lib/logger'

const runAt = ({ seconds = 10 }) => {
  return addSeconds(Date.now(), jitter({ seconds }))
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

  logger.info({ payload }, `Building Enrich Article Job payload: ${articleId}`)

  const token = signPayload({ payload })
  const jobOptions = {
    name: `enrich-article-${articleId}-${seconds}-job`,
    runAt: runAt({ seconds }),
    endpoint: process.env.ENRICH_ARTICLE_JOB_ENDPOINT,
    verb: 'POST',
    json: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    logger.debug({ jobOptions }, `Scheduling Enrich Article Job: ${articleId}`)

    const job = await repeater.enqueueOrUpdate({ ...jobOptions })

    logger.info(job, `Scheduled Enrich Article Job: ${articleId}`)
  } catch (e) {
    logger.error(
      { e, ...payload, ...jobOptions },
      `Failed to Schedule Enrich Article Job`
    )
  }

  logger.debug(
    {
      articleId,
    },
    `Scheduling updateArticleTagsScheduler: ${articleId}`
  )

  const updateArticleTags = await updateArticleTagsScheduler({
    articleId: articleId,
    seconds: seconds + 63,
  })

  logger.debug(
    {
      articleId,
      updateArticleTags,
    },
    `Successfully scheduled updateArticleTags: ${articleId}`
  )

  return articleId
}
