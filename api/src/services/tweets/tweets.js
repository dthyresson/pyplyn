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

export const createTweetFromEntry = ({ entry }) => {
  return db.tweet.create({
    data: {
      entry: {
        create: entryParser(entry),
      },
      ...tweetEntryParser(entry),
    },
  })
}

export const createTweetsFromFeedlyStreamResponse = ({ response }) => {
  return response.items.map(async (item) => {
    return createTweetFromEntry({ entry: item })
  })
}

export const Tweet = {
  entry: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).entry(),
}
