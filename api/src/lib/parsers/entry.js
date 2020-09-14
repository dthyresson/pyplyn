import { fromUnixTime } from 'date-fns'

export const entryParser = (entry) => {
  const documentId = entry.document?.id || entry.id
  const document = entry.document || entry

  return {
    documentId,
    document,
  }
}

export const tweetEntryParser = (entry) => {
  const document = entry.document || entry

  return {
    publishedAt: fromUnixTime(document.published / 1000),
    author: document.author,
    title: document.title,
    url: document.alternate[0]?.href,
  }
}
