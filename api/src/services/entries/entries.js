import { db } from 'src/lib/db'

export const entry = ({ id }) => {
  return db.entry.findOne({ where: { id: id } })
}

export const entryByUid = ({ uid }) => {
  return db.entry.findOne({ where: { uid: uid } })
}

export const entryByDocumentId = ({ documentId }) => {
  return db.entry.findOne({ where: { uid: documentId } })
}

export const entries = () => {
  return db.entry.findMany()
}

export const createEntry = ({ entry }) => {
  return db.entry.create({
    data: {
      uid: entry.id,
      document: entry,
    },
  })
}

export const Entry = {
  article: (_obj, { root }) =>
    db.entry.findOne({ where: { id: root.id } }).article(),
  tweet: (_obj, { root }) =>
    db.entry.findOne({ where: { id: root.id } }).tweet(),
}
