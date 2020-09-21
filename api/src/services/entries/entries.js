import { db } from 'src/lib/db'

export const entries = () => {
  return db.entry.findMany()
}

export const Entry = {
  tweet: (_obj, { root }) =>
    db.entry.findOne({ where: { id: root.id } }).tweet(),
  article: (_obj, { root }) =>
    db.entry.findOne({ where: { id: root.id } }).article(),
  entryStream: (_obj, { root }) =>
    db.entry.findOne({ where: { id: root.id } }).entryStream(),
}
