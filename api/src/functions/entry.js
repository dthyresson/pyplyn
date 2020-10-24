import { logger } from 'src/lib/logger'

import { isAuthorized } from 'src/lib/authorization'

import { entry } from 'src/lib/apiClients/feedly'

export const handler = async (event, _context) => {
  try {
    isAuthorized(event)
  } catch {
    return {
      statusCode: 401,
    }
  }

  try {
    const { entryId } = event.queryStringParameters
    const data = await entry({ id: entryId })

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    }
  } catch (e) {
    logger.error({ e, functionName: 'entry' }, 'Function Handler unauthorized')
    return {
      statusCode: 401,
    }
  }
}
