import { db } from 'src/lib/db'

export const tweets = () => {
  return db.tweet.findMany({
    include: {
      entry: true,
      tweetContext: true,
      tweetCategories: true,
      tags: true,
      tweetPriorities: true,
    },
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
}
