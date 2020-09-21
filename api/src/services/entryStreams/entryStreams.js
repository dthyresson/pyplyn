import { db } from 'src/lib/db'

export const entryStreams = () => {
  return db.entryStream.findMany()
}

export const EntryStream = {
  entries: (_obj, { root }) =>
    db.entryStream.findOne({ where: { id: root.id } }).entries(),
}
