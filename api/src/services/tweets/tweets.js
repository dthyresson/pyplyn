import { db } from 'src/lib/db'

export const tweets = () => {
  return db.tweet.findMany()
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
