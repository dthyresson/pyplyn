import { streamContents } from 'src/lib/apiClients/feedly'
import { loadTweets } from 'src/services/tweetJobs'

export const handler = async (event, _context) => {
  const { streamId, count } = event.queryStringParameters

  let { continuation } = event.queryStringParameters
  let data = {}
  let hasMore = true

  while (hasMore) {
    console.info(continuation)
    data = await streamContents({ streamId, count, continuation })
    continuation = data.continuation
    await loadTweets({ response: data })
    hasMore = continuation && continuation.length > 0
  }

  return {
    statusCode: 202,
    body: JSON.stringify({
      data,
    }),
  }
}
