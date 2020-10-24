import { requireAuth } from 'src/lib/auth'

import {
  jobByName,
  jobResults,
  filteredJobs,
  purgeRepeaterJobs,
  repeaterJobChartData,
} from 'src/lib/repeater'

export const repeaterJobs = async ({ status = 'active' }) => {
  requireAuth()
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
