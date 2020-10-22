import { db } from 'src/lib/db'

export const notifications = () => {
  return db.notification.findMany()
}

export const notification = ({ id }) => {
  return db.notification.findOne({
    where: { id },
  })
}

export const createNotification = ({ input }) => {
  return db.notification.create({
    data: input,
  })
}

export const updateNotification = ({ id, input }) => {
  return db.notification.update({
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
