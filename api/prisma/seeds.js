/* eslint-disable no-console */

const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const fromUnixTime = require('date-fns/fromUnixTime')

dotenv.config()
const db = new PrismaClient()

const tweets = require('../../data/feedly/tweets.json')

async function createTweet(entry) {
  console.log(`Creating Tweet for Entry ${entry.id}`)
  await db.tweet.create({
    data: {
      entry: { create: { documentId: entry.id, document: entry } },
      publishedAt: fromUnixTime(entry.published / 1000),
      author: entry.author,
      title: entry.title,
      url: entry.alternate[0]?.href,
    },
  })
}

async function main() {
  const existing = await db.entry.count()
  if (!existing) {
    console.log('Creating Entries and Tweets ...')
    tweets.items.forEach(async (tweet) => createTweet(tweet))
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
