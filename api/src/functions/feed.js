import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'
import { traverseFeedlyEntryStream } from 'src/services/entryStreamServices'

export const parseAuthorizationHeader = (event) => {
  const [schema, token] = event.headers?.authorization?.split(' ')
  if (!schema.length || !token.length) {
    throw new Error('The `Authorization` header is not valid.')
  }
  return { schema, token }
}

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.FEED_JOB_SECRET)

  logger.debug({ verified: decoded }, 'Decoded signed payload')

  return decoded
}

const requireAuthorization = (event) => {
  const { streamId } = JSON.parse(event.body)

  const { token } = parseAuthorizationHeader(event)
  const decoded = verifyToken(token)

  logger.debug({ decoded: decoded }, 'requireAuthorization')

  return decoded.sub === streamId && decoded.iss === 'pyplyn'
}

export const handler = async (event, _context) => {
  let { streamId, count, continuation, newerThan } = JSON.parse(event.body)

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
