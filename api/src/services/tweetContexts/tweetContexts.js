import { db } from 'src/lib/db'

export const tweetContexts = () => {
  return db.tweetContext.findMany()
}

export const TweetContext = {
  tweet: (_obj, { root }) =>
    db.tweetContexts.findOne({ where: { id: root.id } }).tweet(),
}
