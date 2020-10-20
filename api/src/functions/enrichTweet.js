import { enrichTweetId } from 'src/services/enrichment'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, _context) => {
  try {
    logger.info('Invoked enrichTweet function')

    await db.$connect

    const { tweetId } = JSON.parse(event.body)

    logger.info({ tweetId }, 'Invoked enrichTweet function with tweetId')

    const result = await enrichTweetId({ id: tweetId })

    logger.info(
      { tweetId, result },
      'Completed enrichTweet function with tweetId'
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result,
      }),
    }
  } catch (e) {
    logger.error({ e, functionName: 'enrichTweet' }, 'Function Handler Error')
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
