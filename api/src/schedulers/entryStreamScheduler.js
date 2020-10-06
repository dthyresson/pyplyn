import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'
import { logger } from 'src/lib/logger'

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

  logger.info({ payload }, 'Scheduled Entry Stream Job payload')

  const token = signPayload({ payload })

  try {
    const job = await repeater.enqueueOrUpdate({
      name: 'load-feed-paginated',
      runAt: runAt(count),
      endpoint: process.env.FEEB_JOB_ENDPOINT,
      verb: 'POST',
      json: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    logger.info(job, 'Scheduled Entry Stream Job')
  } catch (e) {
    logger.error({ e, ...payload }, `Failed to Schedule Entry Stream Job`)
  }

  return
}
