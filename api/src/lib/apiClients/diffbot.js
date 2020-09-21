import { backOff } from 'exponential-backoff'
import got from 'got'

export const extractArticle = async ({
  discussion = false,
  fields = 'meta,sentiment,quotes,tags,humanLanguage,diffbotUri,estimatedDate',
  maxTags = 30,
  tagConfidence = 0.3,
  timeout = 60000,
  url,
}) => {
  try {
    const endpoint = `${process.env.DIFFBOT_API_BASE_URL}/v3/article`

    const result = await backOff(
      async () => {
        const response = await got(endpoint, {
          searchParams: {
            discussion,
            fields,
            maxTags,
            tagConfidence,
            url,
            timeout,
            token: process.env.DIFFBOT_API_TOKEN,
          },
        }).json()

        if (response.errorCode) {
          throw new Error(response.error)
        }

        return response.objects?.[0] || null
      },
      { jitter: 'full' }
    )

    return result
  } catch (e) {
    console.error(e)
    return null
  }
}

export const extractText = async ({ content, lang }) => {
  try {
    const endpoint = `${process.env.DIFFBOT_NLP_API_BASE_URL}/`

    const result = await backOff(
      async () => {
        const response = await got
          .post(endpoint, {
            json: { content, lang },
            searchParams: {
              fields: 'entities,sentiment,facts,openFacts,records',
              token: process.env.DIFFBOT_API_TOKEN,
            },
          })
          .json()

        return response
      },
      { jitter: 'full' }
    )

    return result
  } catch (e) {
    console.error(e)
    return null
  }
}
