import { db } from 'src/lib/db'

export const articleByEntryId = ({ entryId }) => {
  return db.article.findOne({ where: { entryId: entryId } })
}

export const articleByDocumentId = ({ documentId }) => {
  return db.entry.findOne({ where: { uid: documentId } }).article()
}
