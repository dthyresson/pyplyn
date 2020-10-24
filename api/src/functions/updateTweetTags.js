import { isAuthorized } from 'src/lib/authorization'

import {
  persistTweetCategories,
  persistTweetPriorities,
} from 'src/services/tweetServices'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, _context) => {
  try {
    isAuthorized(event)
  } catch {
    return {
      statusCode: 401,
    }
  }
  try {
    logger.info('Invoked updateTweetTags function')

    await db.$connect

    const { tweetId } = JSON.parse(event.body)

    logger.info({ tweetId }, 'Invoked updateTweetTags function with tweetId')

    const categories = await persistTweetCategories({ id: tweetId })

    const priorities = await persistTweetPriorities({ id: tweetId })

    logger.info(
      { tweetId, priorities, categories },
      'Completed updateTweetTags function with tweetId'
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: { tweetId, priorities, categories },
      }),
    }
  } catch (e) {
    logger.error(
      { e, functionName: 'updateTweetTags' },
      'Function Handler Error'
    )
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
