import { db } from 'src/lib/db'

import { extractArticleUrl, extractText } from 'src/lib/apiClients/diffbot'

export const enrichArticle = async (article) => {
  const content = await extractArticleUrl({
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
  }

  return article
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
