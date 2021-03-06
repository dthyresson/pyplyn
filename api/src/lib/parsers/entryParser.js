import { fromUnixTime } from 'date-fns'
import striptags from 'striptags'

import { logger } from 'src/lib/logger'

import { DocumentType } from '@prisma/client'

export const entryParser = (entry) => {
  const uid = entry.document?.id || entry.id
  const document = entry.document || entry
  const isTweet =
    document.origin?.htmlUrl &&
    document.origin?.htmlUrl.startsWith('https://twitter.com')

  const documentType = isTweet ? DocumentType.TWEET : DocumentType.ARTICLE

  return {
    uid,
    document,
    documentType,
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

export const articleDetailParser = (article) => {
  article.articleUrl =
    (article.canonical && article.canonical[0])?.href ||
    (article.alternate && article.alternate[0])?.href

  article.articleAuthor =
    article.author ||
    article.authorDetails?.fullname ||
    article.meta?.microdata?.author ||
    'unknown'

  article.articlePublishedAt = fromUnixTime(
    (article.published || article.updated || article.crawled) / 1000
  )

  article.articleTitle = article.title || 'unknown'

  article.description =
    article.meta?.description ||
    article.meta?.microdata?.description ||
    article.meta?.microdata?.['itemprop:description']

  article.articleAuthor =
    article.author ||
    article.authorDetails?.fullname ||
    article.meta?.microdata?.author ||
    'unknown'

  return article
}

export const linkedEntriesParser = (entry) => {
  const document = entry.document || entry

  try {
    return (
      document.linked?.map((article) => {
        return articleDetailParser(article)
      }) || []
    )
  } catch (e) {
    logger.error(e, `Error parsing article for entry ${entry.id}`)

    return []
  }
}
