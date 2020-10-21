import { db } from 'src/lib/db'

export const entryStreamByName = ({ name }) => {
  return db.entryStream.findOne({
    where: { name: name },
  })
}

export const entryStreamByIdentifier = ({ streamIdentifier }) => {
  return db.entryStream.findOne({
    where: { streamIdentifier },
  })
}
