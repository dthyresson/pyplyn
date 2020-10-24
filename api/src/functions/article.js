import { isAuthorized } from 'src/lib/authorization'
import { logger } from 'src/lib/logger'

import { extractArticle } from 'src/lib/apiClients/diffbot'

export const handler = async (event, _context) => {
  try {
    isAuthorized(event)
  } catch {
    return {
      statusCode: 401,
    }
  }

  try {
    const { url } = event.queryStringParameters

    const data = await extractArticle({ url })

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    }
  } catch (e) {
    logger.error(
      { e, functionName: 'article' },
      'Function Handler unauthorized'
    )
    return {
      statusCode: 401,
    }
  }
}
