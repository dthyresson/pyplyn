import { isAuthorized } from 'src/lib/authorization'

import { logger } from 'src/lib/logger'

import { signPayload } from 'src/lib/authorization'

export const handler = async (_event, _context) => {
  try {
    isAuthorized(event)
  } catch {
    return {
      statusCode: 401,
    }
  }

  const payload = { streamId: 'process-entry-stream-job' }

  const token = signPayload({ payload, expiresIn: '1y' })

  try {
    return {
      statusCode: 202,
      body: JSON.stringify({
        data: {
          token,
        },
      }),
    }
  } catch (e) {
    logger.error({ e, functionName: 'signPayload' }, 'Function Handler Error')
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: e,
      }),
    }
  }
}
