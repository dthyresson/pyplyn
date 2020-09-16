import { db } from 'src/lib/db'

export const tweets = () => {
  return db.tweet.findMany()
}

export const tweetExists = ({ url }) => {
  return db.tweet.findMany({ where: { url } }).length === 0
}

export const tweetForUrl = ({ url }) => {
  return db.tweet.findOne({ where: { url }, include: { entry: true } })
}

export const Tweet = {
  entry: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).entry(),
  context: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).tweetContext(),
  categories: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).tweetCategories(),
  priorities: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).tweetPriorities(),
}
