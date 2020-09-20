import { db } from 'src/lib/db'

export const tweetCategories = () => {
  return db.tweetCategory.findMany()
}

export const TweetCategory = {
  tweet: (_obj, { root }) =>
    db.tweetCategory.findOne({ where: { id: root.id } }).tweet(),
}
