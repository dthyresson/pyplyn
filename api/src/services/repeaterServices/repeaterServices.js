import { requireAuth } from 'src/lib/auth'

import {
  jobByName,
  jobResults,
  filteredJobs,
  purgeRepeaterJobs,
  repeaterJobChartData,
  decodeRepeaterJobHeaders,
} from 'src/lib/repeater'

export const repeaterJobs = async ({ status }) => {
  requireAuth()
  console.log(status)
  return filteredJobs({ status })
}

export const deleteCompletedRepeaterJobs = async () => {
  requireAuth()

  return await purgeRepeaterJobs()
}

export const repeaterJob = async ({ name }) => {
  requireAuth()

  return jobByName({ name })
}

export const repeaterJobResults = async ({ name }) => {
  requireAuth()

  return jobResults({ name })
}

export const repeaterJobChart = async ({ name }) => {
  requireAuth()

  return repeaterJobChartData({ name })
}

export const repeaterJobDecodedHeader = async ({ name }) => {
  requireAuth()

  const job = await jobByName({ name })

  const decodedHeaders = await decodeRepeaterJobHeaders(job)

  return { name: job.name, ...decodedHeaders }
}
