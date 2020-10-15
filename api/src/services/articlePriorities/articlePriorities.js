import { db } from 'src/lib/db'

export const articlePriorities = () => {
  return db.articlePriority.findMany()
}

export const ArticlePriority = {
  article: (_obj, { root }) =>
    db.articlePriority.findOne({ where: { id: root.id } }).article(),
  articlePriorityTerms: (_obj, { root }) =>
    db.articlePriority
      .findOne({ where: { id: root.id } })
      .articlePriorityTerms(),
}
