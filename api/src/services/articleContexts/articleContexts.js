import { db } from 'src/lib/db'

export const articleContexts = () => {
  return db.articleContext.findMany()
}

export const ArticleContext = {
  article: (_obj, { root }) =>
    db.articleContexts.findOne({ where: { id: root.id } }).article(),
}
