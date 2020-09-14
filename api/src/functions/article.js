import { article } from 'src/lib/apiClients/diffbot'

export const handler = async (event, _context) => {
  const { url } = event.queryStringParameters

  const data = await article({ url })

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
