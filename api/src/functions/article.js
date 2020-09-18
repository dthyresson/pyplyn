import { extractArticle } from 'src/lib/apiClients/diffbot'

export const handler = async (event, _context) => {
  const { url } = event.queryStringParameters

  const data = await extractArticle({ url })

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
