import { db } from 'src/lib/db'

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
