import { logger } from 'src/lib/logger'

import { streamContents } from 'src/lib/apiClients/feedly'
import { scheduleEntryStreamJob } from 'src/schedulers/entryStreamScheduler'
import { persistTweets } from 'src/services/tweetServices'

export const traverseFeedlyEntryStream = async ({
  streamId,
  count,
  continuation,
  newerThan,
}) => {
  const { response, searchParams } = await streamContents({
    streamId,
    count,
    continuation,
    newerThan,
  })
  try {
    await persistTweets({ data: response })

    const { id, updated, continuation, newerThan } = searchParams

    if (continuation) {
      await scheduleEntryStreamJob({
        streamId,
        count,
        continuation,
        newerThan,
      })

      return { response: { id, updated, continuation, newerThan } }
    } else {
      logger.info(
        { streamId: streamId },
        `Reached end of streamId: ${streamId}`
      )

      return { response: { id, updated, continuation, newerThan } }
    }
  } catch (e) {
    logger.error(
      { e, continuation, newerThan },
      'Error in traverseFeedlyEntryStream'
    )
  }
}
