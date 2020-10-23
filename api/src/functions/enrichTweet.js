import { isAuthorized } from 'src/lib/authorization'
import { enrichTweetId } from 'src/services/enrichment'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, _context) => {
  try {
    logger.info('Invoked enrichTweet function')

    isAuthorized(event)

    await db.$connect

    const { tweetId } = JSON.parse(event.body)

    logger.info({ tweetId }, 'Invoked enrichTweet function with tweetId')

    const result = await enrichTweetId({ id: tweetId })

    logger.debug(
      { tweetId, result },
      'Completed enrichTweet function with tweetId'
    )

    return {
      statusCode: 202,
      body: JSON.stringify({
        data: {
          tweetId,
          message: 'Completed enrichTweet function with tweetId',
        },
      }),
    }
  } catch (e) {
    logger.error({ e, functionName: 'enrichTweet' }, 'Function Handler Error')
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e,
      }),
    }
  } finally {
    await db.$disconnect()
  }
}
