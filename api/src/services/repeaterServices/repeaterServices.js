import { Repeater } from 'repeaterdev-js'
import { logger } from 'src/lib/logger'

const repeater = new Repeater(process.env.REPEATER_API_KEY)

export const repeaterJobs = async () => {
  const jobs = await repeater.jobs()

  logger.debug({ jobsCount: jobs.count }, 'Fetched repeater jobs')
  return jobs
}

export const repeaterJob = async ({ name }) => {
  const job = await repeater.job(name)

  logger.debug({ job: job, jobName: job.name }, 'Fetched repeater job')
  return job
}

export const repeaterJobResults = async ({ name }) => {
  const job = await repeaterJob({ name })
  const results = await job.results()

  return results
}

export const repeaterJobChart = async ({ name }) => {
  const job = await repeaterJob({ name })
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

  return { chart }
}
