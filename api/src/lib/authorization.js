import { createHash } from 'crypto'

import jwt from 'jsonwebtoken'

import { logger } from 'src/lib/logger'

export const isAuthorized = (event) => {
  const isDevEnv = process.env.DOPPLER_ENVIRONMENT !== 'prd'
  if (isDevEnv) {
    logger.warn({ isAuthorized: true }, 'isAuthorized bypassed')
    return true
  }

  try {
    const result = requireAuthorization(event)
    logger.debug({ requireAuthorization: result }, 'isAuthorized passed')
  } catch (e) {
    logger.error({ requireAuthorization: false }, 'isAuthorized failed')
    throw new Error('Authorization failed.')
  }
}

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

export const verifyToken = (token) => {
  logger.debug({ token: token }, 'verifyToken token')
  const decoded = jwt.verify(token, process.env.FEED_JOB_SECRET)

  logger.debug({ verified: decoded }, 'Decoded signed payload')

  return decoded
}

export const requireAuthorization = (event) => {
  const { token } = parseAuthorizationHeader(event)
  return verifyToken(token)
}

export const signPayload = ({ payload, expiresIn = '1h' }) => {
  logger.debug(payload, 'signPayload init payload')

  const digest = createHash('md5')
    .update(JSON.stringify(payload))
    .digest('base64')

  logger.debug({ digest }, 'signPayload digest')

  const token = jwt.sign(
    {
      data: digest,
    },
    process.env.FEED_JOB_SECRET,
    {
      subject:
        payload.streamId || payload.tweetId || payload.articleId || 'pyplyn',
      audience: 'repeater-dev',
      issuer: 'pyplyn',
      expiresIn,
    }
  )

  logger.debug({ token }, 'signPayload token')

  return token
}
