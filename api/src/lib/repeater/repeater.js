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

const deleteJob = async (job) => {
  try {
    const deletedJob = await backOff(() => job.delete(), {
      delayFirstAttempt: true,
      numOfAttempts: 3,
      startingDelay: 250,
    })
    logger.debug({ job }, `Deleted repeater job ${job.name}`)

    return deletedJob
  } catch (e) {
    logger.warn({ e, job }, 'Unable to delete completed Repeater job')
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
          logger.info({ job }, `Deleting repeater job ${job.name}`)

          return await deleteJob(job)
        }

        return null
      })
      .filter((x) => x === {})

    logger.info(
      {
        total: deletedJobs?.length,
      },
      'Deleted repeater jobs'
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

const decodeTs = (timestamp) => {
  try {
    return new Date(timestamp * 1000)
  } catch (e) {
    logger.warn(e, 'Unable to decode timestamp')
    return undefined
  }
}

export const decodeRepeaterJobHeaders = async (job) => {
  const [_schema, token] =
    job.headers?.authorization?.split(' ') ||
    job.headers?.Authorization?.split(' ')

  const decodedToken = jwt.decode(token)
  const issuedAt = decodeTs(decodedToken.iat)
  const expiresIn = decodeTs(decodedToken.exp)
  const subject = decodedToken.sub
  const decodedHeaders = { decodedToken, issuedAt, expiresIn, subject }

  return decodedHeaders
}
