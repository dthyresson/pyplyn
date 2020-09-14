import got from 'got'

export const streamContents = async ({
  streamId,
  importantOnly = true,
  count = 20,
}) => {
  const endpoint = `${process.env.FEEDLY_BASE_URL}/streams/contents`

  if (streamId === undefined) {
    throw Error('Missing streamId')
  }

  const response = await got(endpoint, {
    headers: {
      authorization: `OAuth ${process.env.FEEDLY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    searchParams: { streamId, importantOnly, count },
  })

  return response.body
}
