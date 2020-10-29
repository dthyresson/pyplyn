import { isAuthorized } from 'src/lib/authorization'

import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'
import { traverseFeedlyEntryStream } from 'src/services/entryStreamServices'

export const handler = async (event, _context) => {
  try {
    isAuthorized(event)
  } catch {
    return {
      statusCode: 401,
    }
  }

  let { streamId, count, continuation, newerThan } = JSON.parse(event.body)

  try {
    await db.$connect

    const { response } = await traverseFeedlyEntryStream({
      streamId,
      count: count || 3,
      continuation,
      newerThan,
    })

    return {
      statusCode: 202,
      body: JSON.stringify({
        data: {
          id: response.id || response.streamId,
          updated: response.updated,
          continuation: response.continuation,
          newerThan: response.newerThan,
        },
      }),
    }
  } catch (e) {
    logger.error({ e, functionName: 'feed' }, 'Function Handler Error')
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
