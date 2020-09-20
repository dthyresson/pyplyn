import { db } from 'src/lib/db'

export const tweetPriorities = () => {
  return db.tweetPriority.findMany()
}

export const TweetPriority = {
  tweet: (_obj, { root }) =>
    db.tweetPriority.findOne({ where: { id: root.id } }).tweet(),
  tweetPriorityTerms: (_obj, { root }) =>
    db.tweetPriority.findOne({ where: { id: root.id } }).tweetPriorityTerms(),
}
