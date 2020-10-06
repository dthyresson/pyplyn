import { logger } from 'src/lib/logger'

import { authorize } from 'src/lib/authorization'

import { entry } from 'src/lib/apiClients/feedly'

export const handler = async (event, _context) => {
  try {
    authorize(event)

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
