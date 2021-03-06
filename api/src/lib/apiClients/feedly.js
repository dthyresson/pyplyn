import got from 'got'
import { getTime, subHours } from 'date-fns'

import { logger } from 'src/lib/logger'

export const entry = async (entryId) => {
  return await entries([entryId])
}

export const entries = async (ids) => {
  return await post({
    endpoint: '/entries/.mget',
    json: ids,
  })
}

const setDefaultNewerThan = (newerThan) => {
  const NEWER_THAN_HOURS_AGO = 48

  logger.debug(
    { newerThan: newerThan },
    `setDefaultNewerThan inits newerThan: ${newerThan}`
  )
  if (newerThan === undefined || newerThan === null) {
    newerThan = getTime(subHours(Date.now(), NEWER_THAN_HOURS_AGO))

    logger.warn(
      { newerThan: newerThan },
      `Setting newerThan to ${NEWER_THAN_HOURS_AGO} hours ago`
    )
  } else if (newerThan !== undefined && !RegExp(/^\d+$/).test(newerThan)) {
    try {
      logger.debug(
        { newerThan: newerThan },
        `Parsing newerThan of ${newerThan}`
      )
      newerThan = getTime(Date.parse(newerThan))
    } catch (e) {
      newerThan = getTime(Date.now())
      logger.error({ newerThan: newerThan }, 'Error converting newerThan')
    }
  } else {
    logger.debug({ newerThan: newerThan }, `Using newerThan of ${newerThan}`)
  }

  return newerThan
}

export const streamContents = async ({
  streamId,
  importantOnly = true,
  count = 20,
  continuation,
  newerThan,
  ranked = 'oldest',
}) => {
  try {
    if (streamId === undefined) {
      throw Error('Missing streamId')
    }

    logger.debug(`feedly > streamContents > newerThan ${newerThan}`)

    newerThan = setDefaultNewerThan(newerThan)

    const searchParams = {
      streamId,
      importantOnly,
      count,
      continuation,
      newerThan,
      ranked,
    }

    logger.debug(searchParams, `feedly > streamContents > searchParams`)

    const response = await query({
      endpoint: '/streams/contents',
      searchParams: searchParams,
    })

    return {
      response,
      searchParams: {
        ...searchParams,
        continuation: response.continuation,
        updated: response.updated,
      },
    }
  } catch (e) {
    logger.error(
      { e, streamId, importantOnly, count, continuation, newerThan, ranked },
      'Feedly API client streamContents error'
    )
  }
}

const post = async ({ endpoint, json }) => {
  const url = `${process.env.FEEDLY_BASE_URL}${endpoint}`

  const response = await got.post(url, {
    headers: {
      authorization: `OAuth ${process.env.FEEDLY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    json,
  })
  const body = JSON.parse(response.body)
  if (Array.isArray(body) && body.length === 1) {
    return body[0]
  } else {
    return body
  }
}

const query = async ({ endpoint, searchParams }) => {
  const url = `${process.env.FEEDLY_BASE_URL}${endpoint}`

  const response = await got(url, {
    headers: {
      authorization: `OAuth ${process.env.FEEDLY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    searchParams,
  })

  return JSON.parse(response.body)
}
