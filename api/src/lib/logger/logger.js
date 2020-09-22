import pino from 'pino'

import { config } from 'src/lib/logger/config'
import { db } from 'src/lib/db'

export const logger = pino({
  name: config.name,
  level: config.level,
  prettyPrint: { colorize: true },
})

const dest = pino.destination({
  dest: config.file,
  name: config.name,
  level: config.level,
  prettyPrint: { colorize: true },
})

export const fileLogger = pino(dest)

db.$on('info', (e) => {
  e.timestamp
  e.message
  e.target
  fileLogger.info(e)
  logger.info(e)
})

db.$on('query', (e) => {
  e.query
  e.timestamp
  e.query
  e.params
  e.duration
  e.target
  fileLogger.debug(e)
  logger.debug(e)
})

db.$on('warn', (e) => {
  e.timestamp
  e.message
  e.target
  fileLogger.warn(e)
  logger.warn(e)
})
