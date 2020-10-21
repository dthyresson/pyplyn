import { articleById } from 'src/services/articleQueries'
import { enrichArticleScheduler } from 'src/schedulers/enrichArticleScheduler'
import { updateArticleTagsScheduler } from 'src/schedulers/updateArticleTagsScheduler'

import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

export const refreshArticle = async ({ id }) => {
  requireAuth()

  const article = await articleById({ id })

  if (article) {
    const enrichArticle = await enrichArticleScheduler({
      articleId: article.id,
      seconds: 20,
    })

    const updateArticleTags = await updateArticleTagsScheduler({
      articleId: article.id,
      seconds: 60,
    })

    logger.debug(
      { enrichArticle, updateArticleTags, id },
      'enrichArticleScheduler'
    )
    return article
  }
}
