import { isAuthorized } from 'src/lib/authorization'
import { logger } from 'src/lib/logger'

import { entries } from 'src/lib/apiClients/feedly'

export const handler = async (event, _context) => {
  try {
    isAuthorized(event)

    const ids = JSON.parse(event.body)
    const data = await entries({ ids })

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    }
  } catch (e) {
    logger.error(
      { e, functionName: 'entries' },
      'Function Handler unauthorized'
    )
    return {
      statusCode: 401,
    }
  }
}
