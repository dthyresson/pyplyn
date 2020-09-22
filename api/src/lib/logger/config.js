import merge from 'deepmerge'

import { getConfig } from '@redwoodjs/internal'

const dbLogOptions = {
  log: [
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
    {
      emit: 'event',
      level: 'query',
    },
  ],
}

const DEFAULT_LOG_CONFIG = {
  file: './logs/app2.log',
  level: 'debug',
  dbLogOptions,
}

export const config = merge(
  DEFAULT_LOG_CONFIG,
  getConfig().api?.log?.development || {}
)

console.log(config)
