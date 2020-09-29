import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'
import { traverseFeedlyEntryStream } from 'src/services/entryStreamServices'

export const handler = async (event, _context) => {
  try {
    await db.$connect

    logger.debug(event.headers, 'these are the feed headers')
    const { authorization } = event.headers

    logger.debug(
      { authorization: authorization },
      'this is the feed authorization'
    )

    let { streamId, count, continuation, newerThan } = JSON.parse(event.body)

    const { response } = await traverseFeedlyEntryStream({
      streamId,
      count,
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
