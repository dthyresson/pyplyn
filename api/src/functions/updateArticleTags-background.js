import { isAuthorized } from 'src/lib/authorization'

import {
  persistArticleCategories,
  persistArticlePriorities,
} from 'src/services/articleServices'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, _context) => {
  try {
    isAuthorized(event)
  } catch {
    return {
      statusCode: 401,
    }
  }
  try {
    logger.info('Invoked updateArticleTags function')

    await db.$connect

    const { articleId } = JSON.parse(event.body)

    logger.info(
      { articleId },
      'Invoked updateArticleTags function with articleId'
    )
    const categories = await persistArticleCategories({ id: articleId })

    const priorities = await persistArticlePriorities({ id: articleId })

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
