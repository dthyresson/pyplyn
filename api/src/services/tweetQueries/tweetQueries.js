import { db } from 'src/lib/db'

export const tweet = ({ id }) => {
  return db.tweet.findOne({ where: { id: id } })
}

export const tweetByEntryId = ({ entryId }) => {
  return db.tweet.findOne({ where: { entryId: entryId } })
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
