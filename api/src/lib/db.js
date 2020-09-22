// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.
// import { dbLogOptions } from 'src/lib/logger'

import { config } from 'src/lib/logger/config'

import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient(config.dbLogOptions)
