/* eslint-disable no-console */

const { PrismaClient, StreamSource, StreamType } = require('@prisma/client')
const dotenv = require('dotenv')
var subHours = require('date-fns/subHours')

dotenv.config()
const db = new PrismaClient()

async function main() {
  const existing = await db.entryStream.count()
  if (!existing) {
    console.log('Creating EntryStreams ...')

    await db.entryStream.create({
      data: {
        streamSource: StreamSource.FEEDLY,
        streamType: StreamType.PRIORITY,
        name: 'Ingest Wine Influencer Priority Feed',
        description:
          'Feed prioritized wine related feeds from a set of twitter influencer sources.',
        streamIdentifier:
          'enterprise/dthyressondt/category/e959ead4-c6ce-450e-909a-311de88cd762',
        lastAccessedAt: subHours(Date.now(), 3),
      },
    })
    console.log('... done!')
  } else {
    console.info(
      'Data exists. Not overwriting. See api/prisma/seeds.js for info.'
    )
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
