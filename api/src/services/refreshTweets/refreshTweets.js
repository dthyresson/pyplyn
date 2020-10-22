import { tweetById } from 'src/services/tweetQueries'
import { enrichTweetScheduler } from 'src/schedulers/enrichTweetScheduler'

import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

export const refreshTweet = async ({ id }) => {
  requireAuth()

  const tweet = await tweetById({ id })

  if (tweet) {
    const enrichTweet = await enrichTweetScheduler({
      tweetId: tweet.id,
      seconds: 3,
    })

    logger.debug({ enrichTweet, id }, 'enrichTweetScheduler')
    return tweet
  }
}
