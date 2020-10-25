import { isAuthorized } from 'src/lib/authorization'
import { purgeRepeaterJobs } from 'src/lib/repeater'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, _context) => {
  try {
    isAuthorized(event)
  } catch {
    return {
      statusCode: 401,
    }
  }

  try {
    logger.info('Invoked Delete Completed Repeater Jobs function')

    await db.$connect

    const deletedJobs = await purgeRepeaterJobs()

    logger.info(
      { count: deletedJobs.length },
      'Finished Deleted Completed Repeater Jobs'
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: { message: `Finished Delete Completed Repeater Jobs function` },
      }),
    }
  } catch (e) {
    logger.error(
      { e, functionName: 'Delete Completed Repeater Jobs' },
      'Function Handler Error'
    )
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e,
      }),
    }
  } finally {
    await db.$disconnect()
  }
}
