import pino from 'pino'
import { createWriteStream } from 'pino-logflare'

// import { config } from 'src/lib/logger/config'
import { db } from 'src/lib/db'

const isDevEnv = process.env.DOPPLER_ENVIRONMENT !== 'prd'

const logflareStream = createWriteStream({
  apiKey: process.env.LOGFLARE_API_KEY,
  sourceToken: process.env.LOGFLARE_SOURCE_TOKEN,
})

export const logger = pino(
  {
    name: 'pyplyn',
    level: 'debug',
    base: {
      env: process.env.ENV || 'development',
      name: 'pyplyn',
    },
    nestedKey: 'logPayload',
  },
  isDevEnv ? pino.destination('../logs/api-dev.log') : logflareStream
)

const setupPrismaLoggingEvents = () => {
  db.$on('info', (e) => {
    e.timestamp
    e.message
    e.target
    logger.info(e)
  })

  db.$on('query', (e) => {
    e.query
    e.timestamp
    e.query
    e.params
    e.duration
    e.target
    logger.debug(e)
  })

  db.$on('warn', (e) => {
    e.timestamp
    e.message
    e.target
    logger.warn(e)
  })
}

setupPrismaLoggingEvents()
