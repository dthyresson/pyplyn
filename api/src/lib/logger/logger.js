import pino from 'pino'
// import { createPinoBrowserSend, createWriteStream } from 'pino-logflare'
import { createWriteStream } from 'pino-logflare'

import { config } from 'src/lib/logger/config'
import { db } from 'src/lib/db'

// create pino-logflare stream
const stream = createWriteStream({
  apiKey: process.env.LOGFLARE_API_KEY,
  sourceToken: process.env.LOGFLARE_SOURCE_TOKEN,
})

// create pino-logflare browser stream
// const send = createPinoBrowserSend({
//   apiKey: process.env.LOGFLARE_API_KEY,
//   sourceToken: process.env.LOGFLARE_SOURCE_TOKEN,
// })

// create pino loggger
export const logflareLogger = pino(
  {
    // browser: {
    //   transmit: {
    //     send: send,
    //   },
    // },
    level: config.level,
    base: {
      env: process.env.ENV || 'ENV not set',
      name: config.name,
    },
  },
  stream
)

export const logger = pino({
  name: config.name,
  level: config.level,
  prettyPrint: { colorize: true },
})

// const dest = pino.destination({
//   dest: config.file,
//   name: config.name,
//   level: config.level,
//   prettyPrint: { colorize: true },
// })

// export const fileLogger = pino(dest)

db.$on('info', (e) => {
  e.timestamp
  e.message
  e.target
  logflareLogger.info({ prismaInfo: e }, 'Prisma Info')
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
  // logflareLogger.debug(e)
  // fileLogger.debug({ prismaQuery: e }, 'Prisma Query')
  logger.debug(e)
})

db.$on('warn', (e) => {
  e.timestamp
  e.message
  e.target
  // fileLogger.warn({ prismaWarn: e }, 'Prisma Warn')
  // fileLogger.warn(e)
  logger.warn(e)
})
