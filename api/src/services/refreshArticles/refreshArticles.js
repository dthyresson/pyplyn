import { articleById } from 'src/services/articleQueries'
import { enrichArticleScheduler } from 'src/schedulers/enrichArticleScheduler'

import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

export const refreshArticle = async ({ id }) => {
  requireAuth()

  const article = await articleById({ id })

  if (article) {
    const enrichArticle = await enrichArticleScheduler({
      articleId: article.id,
      seconds: 3,
    })

    logger.debug({ enrichArticle, id }, 'enrichArticleScheduler')
    return article
  }
}
