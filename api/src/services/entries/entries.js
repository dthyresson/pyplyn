import { db } from 'src/lib/db'

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
