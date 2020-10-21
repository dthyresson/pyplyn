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
      logger.warn(
        { errorCode: response.errorCode, url },
        'Error from Diffbot request in extractArticle'
      )

      throw new Error(response.error)
    }

    logger.debug({ endpoint, url, response }, 'Success extractArticle')

    const result = response.objects?.[0] || null

    if (result === undefined) {
      logger.warn(
        { endpoint, url, result },
        'Warning extractArticle result missing'
      )
    }

    logger.debug({ endpoint, url, result }, 'Completed extractArticle')

    return result
  } catch (e) {
    logger.error({ e }, 'Error in extractArticle')
    return null
  }
}

export const extractText = async ({ content, lang }) => {
  try {
    const endpoint = `${process.env.DIFFBOT_NLP_API_BASE_URL}/`

    logger.debug({ endpoint, content }, 'Invoked extractText')

    const response = await got
      .post(endpoint, {
        json: { content, lang },
        searchParams: {
          fields: 'entities,sentiment,facts,openFacts,records',
          token: process.env.DIFFBOT_API_TOKEN,
        },
      })
      .json()

    logger.debug({ endpoint, content, response }, 'Success extractText')

    if (response === undefined) {
      logger.warn(
        { endpoint, content, response },
        'Warning extractText response missing'
      )
    }

    logger.debug({ endpoint, content }, 'Completed extractText')

    return response
  } catch (e) {
    console.error(e)
    logger.error({ e, content }, 'Error in extractText')

    return null
  }
}
