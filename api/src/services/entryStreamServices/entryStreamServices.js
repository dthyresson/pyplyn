import { toDate } from 'date-fns'

import { logger } from 'src/lib/logger'

import { streamContents } from 'src/lib/apiClients/feedly'
import { scheduleEntryStreamJob } from 'src/schedulers/entryStreamScheduler'
import { persistTweets } from 'src/services/tweetServices'

import { updateEntryStream } from 'src/services/entryStreams'
import { entryStreamByIdentifier } from 'src/services/entryStreamQueries'

const updateEntryStreamStatus = async ({
  streamIdentifier,
  continuation,
  newerThan,
}) => {
  const entryStream = await entryStreamByIdentifier({
    streamIdentifier,
    continuation,
    newerThan,
  })
  if (entryStream) {
    await updateEntryStream({
      id: entryStream.id,
      input: {
        continuation: continuation,
        lastAccessedAt: toDate(Date.now()),
      },
    })

    logger.info(
      {
        id: entryStream.id,
        continuation: continuation,
        newerThan: newerThan,
        lastAccessedAt: toDate(Date.now()),
      },
      `Updated entryStream ${entryStream.name}`
    )
  }
}

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

      await updateEntryStreamStatus({
        streamIdentifier: streamId,
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
