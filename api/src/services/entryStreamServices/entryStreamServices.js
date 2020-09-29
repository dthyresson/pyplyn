import { min, toDate } from 'date-fns'

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
  updated,
}) => {
  const entryStream = await entryStreamByIdentifier({
    streamIdentifier,
  })
  if (entryStream) {
    const lastAccessedAt = min([toDate(Date.now()), toDate(updated)])
    await updateEntryStream({
      id: entryStream.id,
      input: {
        continuation: continuation,
        lastAccessedAt: toDate(lastAccessedAt),
        updatedAt: toDate(Date.now()),
      },
    })

    logger.info(
      {
        id: entryStream.id,
        continuation: continuation,
        newerThan: newerThan,
        lastAccessedAt: lastAccessedAt,
        updatedAt: updated,
      },
      `Updated entryStream ${entryStream.name}`
    )
  } else {
    logger.warn(
      {
        id: entryStream.id,
        continuation: continuation,
        newerThan: newerThan,
        updatedAt: updated,
      },
      `No entryStream ${entryStream.name} found to update`
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
      logger.debug('About to scheduleEntryStreamJob')
      await scheduleEntryStreamJob({
        streamId,
        count,
        continuation,
        newerThan,
      })

      logger.debug('About to updateEntryStreamStatus')
      await updateEntryStreamStatus({
        streamIdentifier: streamId,
        continuation,
        newerThan,
        updated,
      })

      return { response: { id, updated, continuation, newerThan } }
    } else {
      logger.info(
        { streamId: streamId },
        `Reached end of streamId: ${streamId}`
      )

      return { response: { streamId, id, updated, continuation, newerThan } }
    }
  } catch (e) {
    logger.error(
      { e, continuation, newerThan },
      'Error in traverseFeedlyEntryStream'
    )
  }
}
