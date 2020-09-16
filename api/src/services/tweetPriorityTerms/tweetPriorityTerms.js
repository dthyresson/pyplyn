import { db } from 'src/lib/db'

export const tweetPriorityTerms = () => {
  return db.tweetPriorityTerm.findMany()
}

export const TweetPriorityTerm = {
  tweetPriority: (_obj, { root }) =>
    db.tweetPriorityTerm.findOne({ where: { id: root.id } }).tweetPriority(),
}
