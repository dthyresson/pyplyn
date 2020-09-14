import { entries } from 'src/lib/apiClients/feedly'

export const handler = async (event, _context) => {
  const ids = JSON.parse(event.body)
  const data = await entries({ ids })

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
