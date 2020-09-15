import { nlp } from 'src/lib/apiClients/diffbot'

import { db } from 'src/lib/db'

export const tweetContexts = () => {
  return db.tweetContext.findMany()
}

export const enrichTweet = async (tweet) => {
  const content = await nlp({
    content: tweet.content,
    lang: 'en',
  })

  console.info(tweet)
  console.info(tweet.id)
  console.info(content)

  return await db.tweetContext.create({
    data: {
      tweet: {
        connect: { id: tweet.id },
      },
      content,
    },
  })
}

export const TweetContext = {
  tweet: (_obj, { root }) =>
    db.tweetContexts.findOne({ where: { id: root.id } }).tweet(),
}
