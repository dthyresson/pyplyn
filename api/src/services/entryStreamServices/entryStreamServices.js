import { min, toDate } from 'date-fns'

import { logger } from 'src/lib/logger'

import { streamContents } from 'src/lib/apiClients/feedly'
import { scheduleEntryStreamJob } from 'src/schedulers/entryStreamScheduler'
import { persistTweet } from 'src/services/tweetServices'
import { persistArticle } from 'src/services/articleServices'

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

  logger.debug(
    {
      streamId,
      count,
      continuation,
      newerThan,
    },
    'In traverseFeedlyEntryStream'
  )

  try {
    const result = await persistEntryStream({ data: response })

    logger.debug(result, 'Completed persistEntryStream')

    const { id, updated, continuation, newerThan } = searchParams

    logger.debug(
      { id, updated, continuation, newerThan },
      'About to updateEntryStreamStatus'
    )

    const updatedEntryStream = await updateEntryStreamStatus({
      streamIdentifier: streamId,
      continuation,
      newerThan,
      updated,
    })

    logger.debug(updatedEntryStream, 'Completed updateEntryStreamStatus')

    if (continuation) {
      logger.debug('About to scheduleEntryStreamJob')
      const rescheduledJob = await scheduleEntryStreamJob({
        streamId,
        count,
        continuation,
        newerThan,
        action: 'Paginate',
      })

      logger.debug(rescheduledJob, 'Completed scheduleEntryStreamJob')

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
      { error: e.message, continuation, newerThan },
      'Error in traverseFeedlyEntryStream'
    )
  }
}

export const persistEntryStream = async ({ data }) => {
  try {
    data?.items.forEach(async (item) => {
      const isTweet =
        item.origin?.htmlUrl &&
        item.origin?.htmlUrl.startsWith('https://twitter.com')

      if (isTweet) {
        try {
          const result = await persistTweet({ entry: item })
          logger.debug(
            { result, entry: item },
            'Completed persistEntryStream persistTweet'
          )
        } catch (e) {
          logger.error(e, `persistEntryStream persistTweet error: ${e.message}`)
          logger.warn(e.stack, 'persistEntryStream persistTweet error stack')
        }
      } else {
        try {
          const result = await persistArticle({ entry: item })
          logger.debug(
            { result, entry: item },
            'Completed persistEntryStream persistArticle'
          )
        } catch (e) {
          logger.error(
            e,
            `persistEntryStream persistArticle error: ${e.message}`
          )
          logger.warn(e.stack, 'persistEntryStream persistArticle error stack')
        }
      }
    })
  } catch (e) {
    logger.error(e, `persistTweets error: ${e.message}`)
    logger.warn(e.stack, 'persistTweets  error stack')
  }
}
