import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'

export const handler = async (_event, _context) => {
  logger.info({ test: 'log_message' }, 'Function test invoked')
  logger.debug({ test: 'log_message' }, 'Function test invoked')
  logger.warn({ test: 'log_message' }, 'Function test warning')
  logger.error({ test: 'log_message' }, 'Function test error')

  const tweetCount = await db.tweet.count()
  const articleCount = await db.article.count()

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: { message: 'test function', tweetCount, articleCount },
    }),
  }
}
