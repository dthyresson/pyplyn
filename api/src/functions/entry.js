import { entry } from 'src/lib/apiClients/feedly'

export const handler = async (event, _context) => {
  const { entryId } = event.queryStringParameters
  const data = await entry({ id: entryId })

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
