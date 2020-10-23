import { toDate } from 'date-fns'

import { DocumentType, NotificationAction } from '@prisma/client'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { createNotification } from 'src/services/notifications'

import { enrichTweetScheduler } from 'src/schedulers/enrichTweetScheduler'
import { entryParser, tweetEntryParser } from 'src/lib/parsers/entryParser'

export const tweets = () => {
  return db.tweet.findMany()
}

export const tweet = ({ id }) => {
  return db.tweet.findOne({
    where: { id },
  })
}

export const createTweet = ({ input }) => {
  return db.tweet.create({
    data: input,
  })
}

export const createTweetFromEntry = async (entry) => {
  const parsedTweet = tweetEntryParser(entry)
  const parsedEntry = entryParser(entry)

  logger.debug({ uid: parsedEntry.uid }, `parsedEntry entry: ${entry.id}`)

  const tweet = await db.tweet.upsert({
    where: { url: parsedTweet.url },
    create: {
      entry: {
        connectOrCreate: {
          where: { uid: parsedEntry.uid },
          create: parsedEntry,
        },
      },
      ...parsedTweet,
    },
    update: { updatedAt: toDate(Date.now()) },
    include: { entry: true },
  })

  let _resultEnrichTweet = await enrichTweetScheduler({
    tweetId: tweet.id,
    seconds: 20,
  })

  logger.debug(
    { tweet: { id: tweet.id, title: tweet.title } },
    `Scheduling tweet enrichment: ${tweet.id}`
  )

  try {
    const notification = await createNotification({
      input: {
        documentType: DocumentType.TWEET,
        action: NotificationAction.CREATE,
        message: tweet.title,
        tweet: { connect: { id: tweet.id } },
      },
    })

    logger.debug(
      { notification, tweet: { id: tweet.id, title: tweet.title } },
      `Successfully added Tweet notification: ${tweet.id}`
    )
  } catch (e) {
    logger.debug(
      { tweet: { id: tweet.id, title: tweet.title } },
      `Successfully added Tweet notification: ${tweet.id}`
    )
  }

  return tweet
}

export const updateTweet = ({ id, input }) => {
  return db.tweet.update({
    data: input,
    where: { id },
  })
}

export const deleteTweet = ({ id }) => {
  return db.tweet.delete({
    where: { id },
  })
}

export const Tweet = {
  entry: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).entry(),
  tweetContext: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).tweetContext(),
  tweetCategories: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).tweetCategories(),
  tweetPriorities: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).tweetPriorities(),
  tags: (_obj, { root }) => db.tweet.findOne({ where: { id: root.id } }).tags(),
  articles: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).articles(),
}
