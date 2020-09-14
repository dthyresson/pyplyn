import { nlp } from 'src/lib/apiClients/diffbot'

import { db } from 'src/lib/db'

export const tweetTextAnalyses = () => {
  return db.tweetTextAnalysis.findMany()
}

export const createTextAnalysisForTweet = async (tweet) => {
  const data = await nlp({
    content: tweet.content,
    lang: 'en',
  })

  return await db.tweetTextAnalysis.create({
    data: {
      tweet: {
        connect: { id: tweet.id },
      },
      nlp: data,
    },
  })
}

export const TweetTextAnalysis = {
  tweet: (_obj, { root }) =>
    db.tweetTextAnalysis.findOne({ where: { id: root.id } }).tweet(),
}
