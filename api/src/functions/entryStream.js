import { isAuthorized } from 'src/lib/authorization'

import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'
import { traverseFeedlyEntryStream } from 'src/services/entryStreamServices'
import { entryStreamByName } from 'src/services/entryStreamQueries'

export const handler = async (event, _context) => {
  logger.info('Invoked entryStream')
  try {
    isAuthorized(event)

    await db.$connect

    const { name, count } = JSON.parse(event.body)

    logger.debug({ name, count }, `Request for entryStream ${name}`)

    if (name === undefined) {
      logger.error({ name }, `No entryStream name specified: ${name}`)

      return {
        statusCode: 500,
      }
    }

    const entryStream = await entryStreamByName({ name })

    if (entryStream === undefined) {
      logger.warn({ name }, `Could not find entryStream for name: ${name}`)

      return {
        statusCode: 404,
      }
    }

    logger.info(entryStream, `Processing entryStream ${entryStream.name}`)

    const { _response } = await traverseFeedlyEntryStream({
      streamId: entryStream.streamIdentifier,
      count: count || 3,
      continuation: entryStream.continuation,
      newerThan: entryStream.lastAccessedAt,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ data: { name: entryStream.name, count } }),
    }
  } catch (e) {
    console.log(e)
    logger.error({ e, functionName: 'entryStream' }, 'Function Handler Error')
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
