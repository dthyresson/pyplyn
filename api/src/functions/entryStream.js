import { logger } from 'src/lib/logger'
import { streamContents } from 'src/lib/apiClients/feedly'
import { persistTweets } from 'src/services/tweetServices'
import { entryStream } from 'src/services/entryStreams'

import { Repeater } from 'repeaterdev-js'
import { addSeconds } from 'date-fns'

const scheduleJob = async ({
  streamId,
  count,
  continuation,
  lastAccessedAt,
}) => {
  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const runAt = addSeconds(Date.now(), Math.ceil(Math.log10(count) * 10))

  // TODO: newerThan: last_accessed_at.to_i }
  const job = await repeater.enqueueOrUpdate({
    name: `load-feed-paginated-${streamId}`,
    runAt: runAt,
    endpoint: 'https://dthyresson.ngrok.io/feed',
    verb: 'POST',
    json: {
      streamId: streamId,
      count: count,
      continuation: continuation,
      lastAccessedAt: lastAccessedAt,
    },
    headers: { 'Content-Type': ' application/json' },
  })

  logger.debug(job, `Scheduled job for ${continuation}`)

  return
}

export const handler = async (event, _context) => {
  const { id } = JSON.parse(event.body)
  logger.info(id)

  const entryStream = await entryStream({ id })
  const params = {
    streamId: entryStream.streamIdentifier,
    count: entryStream.count,
    continuation: entryStream.continuation,
    lastAccessedAt: entryStream.lastAccessedAt,
  }

  logger.info(params)

  const data = await streamContents(...params)

  try {
    const { id, updated, continuation } = data
    const itemsCount = data?.items?.length || 0

    logger.info({ streamId, count, continuation, itemsCount })

    await scheduleJob({ streamId, count, continuation })

    await persistTweets({ response: data })

    return {
      statusCode: 202,
      body: JSON.stringify({
        data: { id, updated, continuation, itemsCount },
      }),
    }
  } catch (e) {
    logger.error(e)
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: e,
      }),
    }
  }
}
