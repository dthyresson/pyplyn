import { db } from 'src/lib/db'

export const article = ({ id }) => {
  return db.article.findOne({ where: { id: id } })
}

export const articleByEntryId = ({ entryId }) => {
  return db.article.findOne({ where: { entryId: entryId } })
}

export const articleByDocumentId = ({ documentId }) => {
  return db.entry.findOne({ where: { uid: documentId } }).article()
}

export const articles = () => {
  return db.article.findMany()
}

export const Article = {
  entry: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).entry(),
}
