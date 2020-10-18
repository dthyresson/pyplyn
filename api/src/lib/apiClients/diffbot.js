import { backOff } from 'exponential-backoff'
import got from 'got'
import { logger } from 'src/lib/logger'

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

    logger.debug({ endpoint, url }, 'Invoke extractArticle')

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
          logger.error(
            { errorCode: response.errorCode, url },
            'Error in extractArticle'
          )

          throw new Error(response.error)
        }

        logger.debug({ endpoint, url }, 'Success extractArticle')

        return response.objects?.[0] || null
      },
      { jitter: 'full' }
    )

    logger.debug({ endpoint, url }, 'Completed extractArticle')

    return result
  } catch (e) {
    console.error(e)
    return null
  }
}

export const extractText = async ({ content, lang }) => {
  try {
    const endpoint = `${process.env.DIFFBOT_NLP_API_BASE_URL}/`

    logger.debug({ endpoint, content }, 'Invoked extractText')

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

        logger.debug({ endpoint, content }, 'Success extractText')

        return response
      },
      { jitter: 'full' }
    )

    logger.debug({ endpoint, content }, 'Completed extractText')

    return result
  } catch (e) {
    console.error(e)
    logger.error({ e, content }, 'Error in extractText')

    return null
  }
}
