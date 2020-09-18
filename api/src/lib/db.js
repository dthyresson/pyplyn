// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'
import pino from 'pino'

export const logger = pino({
  name: 'app-name',
  level: 'debug',
  prettyPrint: { colorize: true },
})

const dest = pino.destination({
  dest: './logs/app.log',
  name: 'app-name',
  level: 'debug',
  prettyPrint: { colorize: true },
})

const fileLogger = pino(dest)

export const db = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
})

db.$on('query', (e) => {
  e.timestamp
  e.query
  e.duration
  e.target
  fileLogger.info(e)
  logger.info(e)
})
