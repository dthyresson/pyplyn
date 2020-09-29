import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'
import { traverseFeedlyEntryStream } from 'src/services/entryStreamServices'
import { entryStreamByName } from 'src/services/entryStreamQueries'

export const parseAuthorizationHeader = (event) => {
  const [schema, token] = event.headers?.authorization?.split(' ')

  logger.debug(
    { schema: schema, token: token },
    'parseAuthorizationHeader schema and token'
  )

  if (!schema.length || !token.length) {
    throw new Error('The `Authorization` header is not valid.')
  }

  return { schema, token }
}

const verifyToken = (token) => {
  logger.debug({ token: token }, 'verifyToken token')
  const decoded = jwt.verify(token, process.env.FEED_JOB_SECRET)

  logger.debug({ verified: decoded }, 'Decoded signed payload')

  return decoded
}

const requireAuthorization = (event) => {
  const { token } = parseAuthorizationHeader(event)
  return verifyToken(token)
}

export const handler = async (event, _context) => {
  try {
    const isAuthorized = requireAuthorization(event)

    logger.debug(
      { isAuthorized: isAuthorized },
      'isAuthorized Decoded signed payload'
    )
  } catch (e) {
    logger.error({ e, functionName: 'feed' }, 'Function Handler unauthorized')
    return {
      statusCode: 401,
    }
  }

  try {
    await db.$connect

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
        statusCode: 404,
      }
    }

    logger.info(entryStream, `Processing entryStream ${entryStream.name}`)

    const { response } = await traverseFeedlyEntryStream({
      streamId: entryStream.streamIdentifier,
      count: count || 3,
      continuation: entryStream.continuation,
      newerThan: entryStream.lastAccessedAt,
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
