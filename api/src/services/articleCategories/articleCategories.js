import { db } from 'src/lib/db'

export const articleCategories = () => {
  return db.articleCategory.findMany()
}

export const ArticleCategory = {
  article: (_obj, { root }) =>
    db.articleCategory.findOne({ where: { id: root.id } }).article(),
}
