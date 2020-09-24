import { db } from 'src/lib/db'

export const entryById = ({ id }) => {
  return db.entry.findOne({ where: { id: id } })
}

export const entryByUid = ({ uid }) => {
  return db.entry.findOne({ where: { uid: uid } })
}

export const entryByDocumentId = ({ documentId }) => {
  return db.entry.findOne({ where: { uid: documentId } })
}

export const createEntry = ({ entry }) => {
  return db.entry.create({
    data: {
      uid: entry.id,
      document: entry,
    },
  })
}
