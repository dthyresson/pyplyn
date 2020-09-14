import { nlp } from 'src/lib/apiClients/diffbot'
import { entryParser, tweetEntryParser } from 'src/lib/parsers/entry'
import { db } from 'src/lib/db'

export const tweets = () => {
  return db.tweet.findMany()
}

export const createTweet = ({ tweet }) => {
  return db.tweet.create({
    data: {
      entry: { connect: { documentId: tweet.entryId } },
      publishedAt: tweet.publishedAt,
      author: tweet.author,
      title: tweet.title,
      url: tweet.url,
    },
  })
}

export const createTweetFromEntry = async ({ entry }) => {
  const tweet = await db.tweet.create({
    data: {
      entry: {
        create: entryParser(entry),
      },
      ...tweetEntryParser(entry),
    },
    include: { entry: true },
  })

  console.info(tweet)

  const data = await nlp({
    content: tweet.content,
    lang: 'en',
  })

  await db.tweetTextAnalysis.create({
    data: {
      tweet: {
        connect: { id: tweet.id },
      },
      nlp: data,
    },
  })

  return tweet
}

export const createTweetsFromFeedlyStreamResponse = ({ response }) => {
  return response.items.map(async (item) => {
    return await createTweetFromEntry({ entry: item })
  })
}

export const Tweet = {
  entry: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).entry(),
}
