import { fromUnixTime } from 'date-fns'

export const entryParser = (entry) => {
  const documentId = entry.document?.id || entry.id
  const document = entry.document || entry

  return {
    documentId,
    document,
  }
}

export const tweetLinkedArticlesParser = (entry) => {
  return entry
}

export const articleEntryParser = (entry) => {
  return entry
}

export const tweetEntryParser = (entry) => {
  const document = entry.document || entry

  return {
    publishedAt: fromUnixTime(document.published / 1000),
    author: document.author,
    title: document.title,
    content: document.content?.content || document.title,
    url: document.alternate[0]?.href,
  }
}
