import { logger } from 'src/lib/logger'
import { traverseFeedlyEntryStream } from 'src/services/entryStreamServices'
import { entryStreamByName } from 'src/services/entryStreamQueries'

export const handler = async (event, _context) => {
  try {
    const { name, count } = JSON.parse(event.body)

    if (name === undefined) {
      logger.error({ name }, `No entryStream name specified: ${name}`)

      return {
        statusCode: 500,
      }
    }

    const entryStream = await entryStreamByName({ name: name })

    if (entryStream === undefined) {
      logger.warn({ name }, `Could not find entryStream for name: ${name}`)

      return {
        statusCode: 204,
      }
    }

    logger.info(entryStream, `Processing entryStream ${entryStream.name}`)

    const response = traverseFeedlyEntryStream({
      streamId: entryStream.streamIdentifier,
      count: count || 3,
      continuation: entryStream.continuation,
      newerThan: entryStream.lastAccessedAt,
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
    logger.error({ e, functionName: 'entryStream' }, 'Function Handler Error')
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: e,
      }),
    }
  }
}
