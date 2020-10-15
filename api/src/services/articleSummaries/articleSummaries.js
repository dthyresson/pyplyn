import { db } from 'src/lib/db'

export const articleSummaries = () => {
  return db.articleSummary.findMany()
}

export const ArticleSummary = {
  article: (_obj, { root }) =>
    db.articleSummary.findOne({ where: { id: root.id } }).article(),
}
