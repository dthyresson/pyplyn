import { isAuthorized } from 'src/lib/authorization'
import { logger } from 'src/lib/logger'

import { extractText } from 'src/lib/apiClients/diffbot'

export const handler = async (event, _context) => {
  try {
    isAuthorized(event)

    const body = JSON.parse(event.body)
    const { content, lang } = body
    const data = await extractText({ content, lang })

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    }
  } catch (e) {
    logger.error({ e, functionName: 'nlp' }, 'Function Handler unauthorized')
    return {
      statusCode: 401,
    }
  }
}
