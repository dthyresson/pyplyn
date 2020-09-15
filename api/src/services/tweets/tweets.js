import { entryParser, tweetEntryParser } from 'src/lib/parsers/entry'
import { enrichTweet } from 'src/services/tweetContexts'
import { db } from 'src/lib/db'

export const tweets = () => {
  return db.tweet.findMany()
}

export const createTweet = ({ tweet }) => {
  return db.tweet.create({
    data: {
      entry: { connect: { uid: tweet.entryId } },
      publishedAt: tweet.publishedAt,
      author: tweet.author,
      title: tweet.title,
      url: tweet.url,
    },
  })
}

export const loadTweet = async ({ entry }) => {
  const tweet = await db.tweet.create({
    data: {
      entry: {
        create: entryParser(entry),
      },
      ...tweetEntryParser(entry),
    },
    include: { entry: true },
  })

  await enrichTweet(tweet)

  return tweet
}

export const loadTweets = async ({ response }) => {
  return response.items.map(async (item) => {
    return await loadTweet({ entry: item })
  })
}

export const Tweet = {
  entry: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).entry(),
}
