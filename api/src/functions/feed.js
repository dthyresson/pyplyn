import { streamContents } from 'src/lib/apiClients/feedly'
import { persistTweets } from 'src/services/tweetJobs'

export const handler = async (event, _context) => {
  const { streamId, count, continuation } = event.queryStringParameters
  const data = await streamContents({ streamId, count, continuation })

  await persistTweets({ response: data })

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
