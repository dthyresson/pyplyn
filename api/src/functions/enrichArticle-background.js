import { isAuthorized } from 'src/lib/authorization'
import { enrichArticleId } from 'src/services/enrichment'

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
    logger.info('Invoked enrichArticle function')

    await db.$connect

    const { articleId } = JSON.parse(event.body)

    logger.info({ articleId }, 'Invoked enrichArticle function with articleId')

    const result = await enrichArticleId({ id: articleId })

    logger.debug(
      { articleId, result },
      'Completed enrichArticle function with articleId'
    )

    return {
      statusCode: 202,
      body: JSON.stringify({
        data: {
          articleId,
          message: 'Completed enrichArticle function with articleId',
        },
      }),
    }
  } catch (e) {
    logger.error({ e, functionName: 'enrichArticle' }, 'Function Handler Error')
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e,
      }),
    }
  } finally {
    await db.$disconnect()
  }
}
