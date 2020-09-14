import { db } from 'src/lib/db'

export const entries = () => {
  return db.entry.findMany()
}

export const createEntry = ({ entry }) => {
  return db.post.create({
    data: {
      documentId: entry.id,
      document: entry,
    },
  })
}
