import { streamContents } from 'src/lib/apiClients/feedly'
import { createTweetsFromStreamResponse } from 'src/services/tweets'

export const handler = async (event, _context) => {
  const { streamId, count } = event.queryStringParameters
  const data = await streamContents({ streamId, count })

  await createTweetsFromStreamResponse({ response: data })

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
