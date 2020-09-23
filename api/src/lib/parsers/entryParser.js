import { fromUnixTime } from 'date-fns'
import striptags from 'striptags'

import { logger } from 'src/lib/logger'

export const entryParser = (entry) => {
  const uid = entry.document?.id || entry.id
  const document = entry.document || entry

  return {
    uid,
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
    content: striptags(document.content?.content || document.title),
    url: document.alternate[0]?.href,
  }
}

export const linkedArticleParser = (entry) => {
  const document = entry.document || entry

  try {
    return (
      document.linked?.map((linkedEntry) => {
        linkedEntry.articleUrl =
          (linkedEntry.canonical && linkedEntry.canonical[0])?.href ||
          (linkedEntry.alternate && linkedEntry.alternate[0])?.href

        linkedEntry.articleAuthor =
          linkedEntry.author ||
          linkedEntry.authorDetails?.fullname ||
          linkedEntry.meta?.microdata?.author ||
          'unknown'

        linkedEntry.articlePublishedAt = fromUnixTime(
          (linkedEntry.published ||
            linkedEntry.updated ||
            linkedEntry.crawled) / 1000
        )

        linkedEntry.articleTitle = linkedEntry.title || 'unknown'

        linkedEntry.description =
          linkedEntry.meta?.description ||
          linkedEntry.meta?.microdata?.description ||
          linkedEntry.meta?.microdata?.['itemprop:description']

        linkedEntry.articleAuthor =
          linkedEntry.author ||
          linkedEntry.authorDetails?.fullname ||
          linkedEntry.meta?.microdata?.author ||
          'unknown'

        return linkedEntry
      }) || []
    )
  } catch (e) {
    logger.error(e, `Error parsing linkedEntry ${entry.id}`)

    return []
  }
}
