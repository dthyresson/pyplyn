import { db } from 'src/lib/db'

export const entries = () => {
  return db.entry.findMany()
}
