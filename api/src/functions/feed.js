import { getTime, addSeconds, subHours } from 'date-fns'
import jws from 'jws'
import { Repeater } from 'repeaterdev-js'

import { logger } from 'src/lib/logger/logger'
import { streamContents } from 'src/lib/apiClients/feedly'
import { persistTweets } from 'src/services/tweetJobs'

const scheduleEntryStreamJob = async ({
  streamId,
  count,
  continuation,
  newerThan,
}) => {
  logger.info(
    {
      streamId,
      count,
      continuation,
      newerThan,
    },
    'feed handler > scheduleJob > new job'
  )

  logger.debug(
    { streamId, count, continuation, newerThan },
    `feed handler > scheduleJob set newerThan: ${newerThan} and continuation: ${continuation}`
  )
  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const runAt = addSeconds(Date.now(), Math.ceil(Math.log10(count) * 10))

  const payload = {
    streamId,
    count,
    continuation,
    newerThan,
  }

  const secret = process.env.FEED_JOB_SECRET

  const signature = jws.sign({
    header: { alg: 'HS256' },
    payload,
    secret,
  })

  logger.debug(signature, `feed handler > signature > ${signature}`)

  try {
    const job = await repeater.enqueueOrUpdate({
      name: 'load-feed-paginated',
      runAt: runAt,
      endpoint: 'https://dthyresson.ngrok.io/feed',
      verb: 'POST',
      json: payload,
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    })

    logger.debug(
      job,
      `feed handler > scheduleJob > Scheduled job for continuation: ${continuation} and newerThan: ${newerThan}`
    )
  } catch (e) {
    logger.error(
      e,
      `scheduleEntryStreamJob error continuation: ${continuation} and newerThan: ${newerThan}`
    )
  }

  return
}

export const handler = async (event, _context) => {
  let { streamId, count, continuation, newerThan } = JSON.parse(event.body)

  logger.info(
    { streamId, count, continuation },
    `feed handler > init continuation: ${continuation} and newerThan: ${newerThan}`
  )

  if (newerThan && isNaN(newerThan)) {
    try {
      newerThan = getTime(Date.parse(newerThan))
      logger.debug(
        { newerThan },
        `feed handler > setting newerThan to  > newerThan: ${newerThan} and continuation: ${continuation}`
      )
    } catch (e) {
      //no op
      logger.error(
        {},
        `feed handler >  error > newerThan: ${newerThan} and continuation: ${continuation}`
      )
    }
  } else if (newerThan === undefined) {
    newerThan = getTime(subHours(Date.now(), 6))

    logger.warn(
      {},
      `feed handler > NO newerThan warning so setting to ${newerThan} `
    )
  }

  logger.debug(
    { streamId, count, continuation, newerThan },
    `feed handler > set newerThan: ${newerThan} and continuation: ${continuation}`
  )

  const data = await streamContents({
    streamId,
    count,
    continuation,
    newerThan,
  })

  try {
    await persistTweets({ response: data })

    const { id, updated, continuation } = data
    const itemsCount = data?.items?.length || 0

    logger.debug(
      { id: data.id, updated: data.updated, continuation: data.continuation },
      `feed handler > resulting data - updated: ${data.updated}, continuation: ${data.continuation}`
    )

    logger.info(
      { streamId, count, continuation, itemsCount, newerThan },
      'feed handler > completed'
    )

    if (continuation) {
      logger.debug(
        {
          streamId,
          count,
          continuation,
          itemsCount,

          newerThan,
        },
        `feed handler > scheduling new job newerThan: ${newerThan} and continuation: ${continuation}`
      )

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
          itemsCount,
        },
      }),
    }
  } catch (e) {
    logger.error(e, `feed handler > error ${e.name} ${e.message}`)
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: e,
      }),
    }
  }
}
