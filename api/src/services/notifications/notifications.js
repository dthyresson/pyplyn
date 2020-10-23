import { db } from 'src/lib/db'

export const notifications = async () => {
  return await db.notification.findMany()
}

export const notification = async ({ id }) => {
  return await db.notification.findOne({
    where: { id },
  })
}

export const createNotification = async ({ input }) => {
  return await db.notification.create({
    data: input,
  })
}

export const updateNotification = async ({ id, input }) => {
  return await db.notification.update({
    data: input,
    where: { id },
  })
}

export const deleteNotification = ({ id }) => {
  return db.notification.delete({
    where: { id },
  })
}

export const Notification = {
  tweet: (_obj, { root }) =>
    db.notification.findOne({ where: { id: root.id } }).tweet(),
  article: (_obj, { root }) =>
    db.notification.findOne({ where: { id: root.id } }).article(),
}
