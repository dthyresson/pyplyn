import { db } from 'src/lib/db'

export const tweets = () => {
  return db.tweet.findMany()
}

export const Tweet = {
  entry: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).entry(),
  tweetContext: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).tweetContext(),
  tweetCategory: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).tweetCategory(),
}
