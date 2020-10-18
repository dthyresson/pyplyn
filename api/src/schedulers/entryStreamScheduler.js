import camelCase from 'camelcase'
import { addSeconds } from 'date-fns'
import { Repeater } from 'repeaterdev-js'
import { signPayload } from 'src/lib/authorization'

import { entryStreamByIdentifier } from 'src/services/entryStreamQueries'

import { logger } from 'src/lib/logger'

const runAt = (count = 10) => {
  return addSeconds(Date.now(), count * 10)
}

export const scheduleEntryStreamJob = async ({
  streamId,
  count,
  continuation,
  newerThan,
  action = '',
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

  const entryStream = await entryStreamByIdentifier({
    streamIdentifier: streamId,
  })

  try {
    const job = await repeater.enqueueOrUpdate({
      name: `${camelCase(entryStream.name)}${action}Job`,
      runAt: runAt(count),
      endpoint: process.env.FEED_JOB_ENDPOINT,
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
