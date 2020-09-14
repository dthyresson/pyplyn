import got from 'got'

export const article = async ({
  discussion = false,
  fields = 'meta,sentiment,quotes',
  maxTags = 30,
  tagConfidence = 0.3,
  url,
}) => {
  const endpoint = `${process.env.DIFFBOT_API_BASE_UR}/v3/article`
  const response = await got(endpoint, {
    searchParams: {
      discussion,
      fields,
      maxTags,
      tagConfidence,
      url,
      token: process.env.DIFFBOT_API_TOKEN,
    },
  })
  return JSON.parse(response.body)
}

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
