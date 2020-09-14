import { db } from 'src/lib/db'

export const articles = () => {
  return db.article.findMany()
}

export const Article = {
  entry: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).entry(),
}
