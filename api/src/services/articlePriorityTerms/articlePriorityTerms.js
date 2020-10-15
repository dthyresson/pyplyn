import { db } from 'src/lib/db'

export const articlePriorityTerms = () => {
  return db.articlePriorityTerm.findMany()
}

export const ArticlePriorityTerm = {
  articlePriority: (_obj, { root }) =>
    db.articlePriorityTerm
      .findOne({ where: { id: root.id } })
      .articlePriority(),
}
