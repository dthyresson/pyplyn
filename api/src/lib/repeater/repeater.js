import { formatISO } from 'date-fns'

import jwt from 'jsonwebtoken'
import { Repeater } from 'repeaterdev-js'
import { backOff } from 'exponential-backoff'

import { logger } from 'src/lib/logger'

export const jobByName = async ({ name }) => {
  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const job = await repeater.job(name)

  logger.debug({ job: job, jobName: job.name }, 'Fetched repeater job')

  return job
}
export const jobResults = async ({ name }) => {
  const job = await jobByName({ name })
  return await job.results()
}

export const filteredJobs = async ({ status = 'active' }) => {
  const repeater = new Repeater(process.env.REPEATER_API_KEY)

  const jobs = await repeater.jobs()

  logger.debug({ status }, 'Fetching repeater jobs')

  if (status === 'active') {
    const activeJobs = jobs
      .map((job) => {
        if (job.enabled && (job.runEvery || job.nextRunAt)) {
          return job
        }
      })
      .filter((x) => x)

    logger.debug({ jobsCount: activeJobs.count }, 'Fetched repeater jobs')
    return activeJobs
  } else {
    return jobs
  }
}

export const purgeRepeaterJobs = async () => {
  try {
    logger.info('Deleting repeater jobs')
    logger.debug('Fetching repeater jobs')

    const repeater = new Repeater(process.env.REPEATER_API_KEY)

    const jobs = await repeater.jobs()

    const deletedJobs = jobs
      .map(async (job) => {
        logger.debug({ job }, `Checking repeater job ${job.name}`)

        if (!(job.enabled && (job.runEvery || job.nextRunAt))) {
          logger.debug({ job }, `Deleting repeater job ${job.name}`)

          try {
            const deletedJob = await backOff(() => job.delete(), {
              delayFirstAttempt: true,
              numOfAttempts: 3,
              startingDelay: 250,
            })
            return deletedJob
          } catch (e) {
            logger.warn({ e, job }, 'Unable to delete completed Repeater job')
          }
        }

        return null
      })
      .filter((x) => x === {})

    logger.debug(
      {
        total: deletedJobs?.length,
      },
      `Deleted repeater jobs: ${deletedJobs?.length}`
    )

    return deletedJobs
  } catch (e) {
    console.log(e)
    logger.error({ e }, 'Error deleting completed Repeater jobs')
    return []
  }
}

export const repeaterJobChartData = async ({ name }) => {
  logger.info('Calculating Repeater Job Chart Data')

  const job = await jobByName({ name })

  logger.debug({ job }, 'Found job')

  const results = await job.results()

  let chartSeries = {}

  results.forEach((result) => {
    if (chartSeries[result.status] === undefined)
      chartSeries[result.status] = { data: [] }
    else {
      const x = result.runAt.toISOString()
      const y = result.duration / 1000

      const point = {
        x,
        y,
      }
      chartSeries[result.status].data.push(point)
    }
  })

  const chart = Object.keys(chartSeries).map((id) => {
    return {
      id: id,
      ...chartSeries[id],
    }
  })

  logger.info('Calculated Repeater Job Chart Data')

  return { chart }
}

export const decodeRepeaterJobHeaders = async (job) => {
  const [_schema, token] = job.headers?.authorization?.split(' ')

  const decodedToken = jwt.decode(token)
  const issuedAt = new Date(decodedToken.iat * 1000)
  const expiresIn = new Date(decodedToken.exp * 1000)
  const subject = decodedToken.sub
  const decodedHeaders = { decodedToken, issuedAt, expiresIn, subject }

  console.log(decodedHeaders)

  return decodedHeaders
}
