import { streamContents } from 'src/lib/apiClients/feedly'

export const handler = async (event, _context) => {
  console.log(event)

  const { streamId, count } = event.queryStringParameters
  const stream = await streamContents({ streamId, count })

  return {
    statusCode: 200,
    body: JSON.stringify({
      stream,
    }),
  }
}
