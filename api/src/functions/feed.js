import { logger } from 'src/lib/logger'

import { streamContents } from 'src/lib/apiClients/feedly'
import { scheduleEntryStreamJob } from 'src/schedulers/entryStreamScheduler'
import { persistTweets } from 'src/services/tweetServices'

export const handler = async (event, _context) => {
  let { streamId, count, continuation, newerThan } = JSON.parse(event.body)

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
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          id,
          updated,
          continuation,
          newerThan,
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
  }
}
