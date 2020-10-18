import deburr from 'lodash.deburr'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const tweetById = ({ id }) => {
  return db.tweet.findOne({
    where: { id: id },
    include: {
      entry: true,
      articles: {
        include: {
          tags: { where: { confidence: { gte: 0.4 }, mentions: { gt: 0 } } },
        },
      },
      tweetContext: true,
      tweetCategories: true,
      tags: { where: { confidence: { gte: 0.4 }, mentions: { gt: 0 } } },
      tweetPriorities: true,
    },
  })
}

export const tweetByEntryId = ({ entryId }) => {
  return db.tweet.findOne({
    where: { entryId: entryId },
    include: {
      articles: true,
      entry: true,
      tweetContext: true,
      tweetCategories: true,
      tags: true,
      tweetPriorities: true,
    },
  })
}

export const tweetsForLabel = async ({ label }) => {
  const safeLabel = deburr(decodeURI(label))

  logger.debug({ label, safeLabel }, 'Query tweetsForLabel')

  const SQL = `SELECT t.*
  FROM
	  "Tweet" t
	JOIN "Tag" AS g ON g. "tweetId" = t. "id"
  WHERE
	  lower(extensions.unaccent(g.label)) = lower(extensions.unaccent($1))
    AND g. "tweetId" IS NOT NULL
  ORDER BY t."publishedAt" DESC
  `

  return await db.$queryRaw(SQL, safeLabel)
}

export const paginateTweets = async ({
  page = 1,
  limit = 20,
  order = { publishedAt: 'desc' },
}) => {
  logger.debug({ page, limit, order }, 'Query paginateTweets')

  page = page < 1 ? 1 : page

  const offset = (page - 1) * limit

  return {
    tweets: db.tweet.findMany({
      include: { articles: true, tags: true, tweetPriorities: true },
      take: limit,
      skip: offset,
      orderBy: order,
    }),
    pagination: {
      limit: limit,
      offset: offset,
      total: db.tweet.count(),
    },
  }
}

export const tweetByDocumentId = ({ documentId }) => {
  return db.entry.findOne({ where: { uid: documentId } }).tweet()
}

export const tweetExists = ({ url }) => {
  return db.tweet.findMany({ where: { url } }).length === 0
}

export const tweetForUrl = ({ url }) => {
  return db.tweet.findOne({ where: { url }, include: { entry: true } })
}
