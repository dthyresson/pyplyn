import { nlp } from 'src/lib/apiClients/diffbot'

export const handler = async (event, _context) => {
  const body = JSON.parse(event.body)
  const { content, lang } = body
  const data = await nlp({ content, lang })

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  }
}
