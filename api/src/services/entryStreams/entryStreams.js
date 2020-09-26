import { db } from 'src/lib/db'

export const entryStreams = () => {
  return db.entryStream.findMany()
}

export const entryStream = ({ id }) => {
  return db.entryStream.findOne({
    where: { id },
  })
}

export const createEntryStream = ({ input }) => {
  return db.entryStream.create({
    data: input,
  })
}

export const updateEntryStream = ({ id, input }) => {
  return db.entryStream.update({
    data: input,
    where: { id },
  })
}

export const deleteEntryStream = ({ id }) => {
  return db.entryStream.delete({
    where: { id },
  })
}

export const EntryStream = {
  entries: (_obj, { root }) =>
    db.entryStream.findOne({ where: { id: root.id } }).entries(),
}
