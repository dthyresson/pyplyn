import { db } from 'src/lib/db'

export const articleTags = () => {
  return db.articleTag.findMany()
}

export const ArticleTag = {
  article: (_obj, { root }) =>
    db.articleTag.findOne({ where: { id: root.id } }).article(),
}
