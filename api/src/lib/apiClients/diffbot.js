import got from 'got'

export const nlp = async ({ content, lang }) => {
  const endpoint = `${process.env.DIFFBOT_NLP_API_BASE_URL}/`
  const response = await got.post(endpoint, {
    json: { content, lang },
    searchParams: {
      fields: 'entities,sentiment,facts,openFacts,records',
      token: process.env.DIFFBOT_API_TOKEN,
    },
    responseType: 'json',
  })

  return response.body
}
