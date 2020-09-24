import { db } from 'src/lib/db'

export const articleById = ({ id }) => {
  return db.article.findOne({ where: { id: id }, include: { entry: true } })
}

export const articleByEntryId = ({ entryId }) => {
  return db.article.findOne({ where: { entryId: entryId } })
}

export const articleByDocumentId = ({ documentId }) => {
  return db.entry.findOne({ where: { uid: documentId } }).article()
}
