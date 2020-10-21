import { isAuthorized } from 'src/lib/authorization'

import {
  persistArticleCategories,
  persistArticlePriorities,
} from 'src/services/articleServices'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, _context) => {
  try {
    logger.info('Invoked updateArticleTags function')

    isAuthorized(event)

    await db.$connect

    const { articleId } = JSON.parse(event.body)

    logger.info(
      { articleId },
      'Invoked updateArticleTags function with articleId'
    )

    const priorities = await persistArticlePriorities({ id: articleId })
    const categories = await persistArticleCategories({ id: articleId })

    logger.info(
      { articleId, priorities, categories },
      'Completed updateArticleTags function with articleId'
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: { articleId, priorities, categories },
      }),
    }
  } catch (e) {
    logger.error(
      { e, functionName: 'updateArticleTags' },
      'Function Handler Error'
    )
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: e,
      }),
    }
  } finally {
    await db.$disconnect()
  }
}
