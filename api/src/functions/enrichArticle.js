import { isAuthorized } from 'src/lib/authorization'
import { enrichArticleId } from 'src/services/enrichment'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, _context) => {
  try {
    logger.info('Invoked enrichArticle function')

    isAuthorized(event)

    await db.$connect

    const { articleId } = JSON.parse(event.body)

    logger.info({ articleId }, 'Invoked enrichArticle function with articleId')

    const result = await enrichArticleId({ id: articleId })

    logger.info(
      { articleId, result },
      'Completed enrichArticle function with articleId'
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result,
      }),
    }
  } catch (e) {
    logger.error({ e, functionName: 'enrichArticle' }, 'Function Handler Error')
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
