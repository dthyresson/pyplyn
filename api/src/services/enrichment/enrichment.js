import { db } from 'src/lib/db'

import { extractArticle, extractText } from 'src/lib/apiClients/diffbot'

import { articleData } from 'src/lib/parsers/articleParser'

export const enrichArticle = async (article) => {
  const content = await extractArticle({
    url: article.url,
  })

  if (content !== undefined) {
    await db.articleContext.create({
      data: {
        article: {
          connect: { id: article.id },
        },
        content,
      },
    })

    const data = articleData(content)

    await db.article.update({
      where: { id: article.id },
      data: {
        articleText: data.articleText,
        author: data.author,
        description: data.description,
        language: data.language,
        sentiment: data.sentiment,
        siteName: data.siteName,
        tagLabels: { set: data.tagLabels },
      },
    })

    data.tags?.forEach(async (tag) => {
      await db.articleTag.create({
        data: {
          article: { connect: { id: article.id } },
          label: tag.label,
          uri: tag.uri || tag.label,
          count: tag.count,
          score: tag.score,
          rdfTypes: { set: tag.rdfTypes || [''] },
          sentiment: tag.sentiment,
        },
      })
    })
  }

  return db.article.findOne({
    where: { id: article.id },
    include: { articleContext: true, articleTags: true },
  })
}

export const enrichTweet = async (tweet) => {
  const content = await extractText({
    content: tweet.content,
    lang: 'en',
  })

  if (content !== undefined) {
    await db.tweet.update({
      where: { id: tweet.id },
      data: { sentiment: content.sentiment },
    })

    await db.tweetContext.create({
      data: {
        tweet: {
          connect: { id: tweet.id },
        },
        content,
      },
    })
  }

  return tweet
}
