export const articleData = (extractedArticle) => {
  const description =
    extractedArticle.meta?.description ||
    extractedArticle.meta?.microdata?.description ||
    extractedArticle.meta?.microdata?.['itemprop:description']
  const author = extractedArticle.author || 'unknown'
  const articleText = extractedArticle.text
  const tags = extractedArticle.tags

  const data = { articleText, author, description, tags }

  return data
}
