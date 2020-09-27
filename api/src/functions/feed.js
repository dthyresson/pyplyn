import { logger } from 'src/lib/logger'
import { traverseFeedlyEntryStream } from 'src/services/entryStreamServices'

export const handler = async (event, _context) => {
  try {
    let { streamId, count, continuation, newerThan } = JSON.parse(event.body)

    const response = traverseFeedlyEntryStream({
      streamId,
      count,
      continuation,
      newerThan,
    })

    return {
      statusCode: 202,
      body: JSON.stringify({
        data: {
          id: response.id,
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
  }
}
