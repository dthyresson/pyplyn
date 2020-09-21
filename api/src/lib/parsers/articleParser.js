export const articleData = (extractedArticle) => {
  const description =
    extractedArticle.meta?.description ||
    extractedArticle.meta?.microdata?.description ||
    extractedArticle.meta?.microdata?.['itemprop:description']
  const author = extractedArticle.author || 'unknown'
  const articleText = extractedArticle.text
  const language = extractedArticle.humanLanguage
  const sentiment = extractedArticle.sentiment || 0
  const siteName = extractedArticle.siteName
  const tags = extractedArticle.tags
  const tagLabels = (extractedArticle.tags || []).map((tag) => tag.label)
  const url = extractedArticle.pageUrl

  const data = {
    articleText,
    author,
    description,
    language,
    sentiment,
    siteName,
    tags,
    tagLabels,
    url,
  }

  return data
}
