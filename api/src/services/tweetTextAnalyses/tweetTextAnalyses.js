import { db } from 'src/lib/db'

export const tweetTextAnalyses = () => {
  return db.tweetTextAnalysis.findMany()
}

export const TweetTextAnalysis = {
  tweet: (_obj, { root }) =>
    db.tweetTextAnalysis.findOne({ where: { id: root.id } }).tweet(),
}
