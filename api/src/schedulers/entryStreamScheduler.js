import { logger } from 'src/lib/logger'
import { addSeconds } from 'date-fns'
import jws from 'jws'
import { Repeater } from 'repeaterdev-js'

const runAt = (count = 10) => {
  return addSeconds(Date.now(), Math.ceil(Math.log10(count) * 10))
}

export const scheduleEntryStreamJob = async ({
  streamId,
  count,
  continuation,
  newerThan,
}) => {
  const repeater = new Repeater(process.env.REPEATER_API_KEY)

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

  try {
    const job = await repeater.enqueueOrUpdate({
      name: 'load-feed-paginated',
      runAt: runAt(count),
      endpoint: 'https://dthyresson.ngrok.io/feed',
      verb: 'POST',
      json: payload,
      headers: {
        Authorization: `Bearer ${signature}`,
      },
    })

    logger.debug(job, 'Scheduled Entry Stream Job')
  } catch (e) {
    logger.error({ e, ...payload }, `Failed to Schedule Entry Stream Job`)
  }

  return
}
