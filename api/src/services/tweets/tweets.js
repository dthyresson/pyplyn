import { fromUnixTime } from 'date-fns'
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

const entryParser = (entry) => {
  return { documentId: entry.document.id, document: entry.document }
}

const entryTweetParser = (entry) => {
  const document = entry.document
  return {
    publishedAt: fromUnixTime(document.published / 1000),
    author: document.author,
    title: document.title,
    url: document.alternate[0]?.href,
  }
}

export const createTweetFromEntry = ({ entry }) => {
  return db.tweet.create({
    data: {
      entry: {
        create: entryParser(entry),
      },
      ...entryTweetParser(entry),
    },
  })
}

export const createTweetFromEntries = ({ entries }) => {
  return entries.map(async (entry) => createTweetFromEntry(entry))
}

export const Tweet = {
  entry: (_obj, { root }) =>
    db.tweet.findOne({ where: { id: root.id } }).entry(),
}
