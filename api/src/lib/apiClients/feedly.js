import got from 'got'

export const entry = async (entryId) => {
  return await entries([entryId])
}

export const entries = async (ids) => {
  return await post({
    endpoint: '/entries/.mget',
    json: ids,
  })
}

export const streamContents = async ({
  streamId,
  importantOnly = true,
  count = 20,
}) => {
  if (streamId === undefined) {
    throw Error('Missing streamId')
  }

  return await query({
    endpoint: '/streams/contents',
    searchParams: { streamId, importantOnly, count },
  })
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
