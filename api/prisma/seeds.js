/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

const tweets = require('../../data/feedly/tweets.json')

async function createEntry(entry) {
  console.log(`Creating ${entry.id}`)
  const response = await db.entry.create({
    data: { documentId: entry.id, document: entry },
  })

  return response
}

async function main() {
  const existing = await db.entry.count()
  if (!existing) {
    try {
      tweets.items.forEach(async (tweet) => await createEntry(tweet))
    } catch (e) {
      console.log(e)
    }
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
