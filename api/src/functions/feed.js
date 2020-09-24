import { logger } from 'src/lib/logger/logger'
import { streamContents } from 'src/lib/apiClients/feedly'
import { persistTweets } from 'src/services/tweetJobs'

export const handler = async (event, _context) => {
  const { streamId, count, continuation } = JSON.parse(event.body)
  logger.info(streamId)

  const data = await streamContents({ streamId, count, continuation })
  logger.info({ streamId, count, continuation })
  try {
    await persistTweets({ response: data })

    const { id, updated, continuation } = data
    const itemsCount = data?.items?.length || 0

    logger.info({ streamId, count, continuation, itemsCount })
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: { id, updated, continuation, itemsCount },
      }),
    }
  } catch (e) {
    logger.error(e)
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: e,
      }),
    }
  }
}
