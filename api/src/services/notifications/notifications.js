import { toDate, subMinutes } from 'date-fns'

import { db } from 'src/lib/db'

const recently = toDate(subMinutes(Date.now(), 60))
const recent = toDate(subMinutes(Date.now(), 60))

export const notifications = async () => {
  return await db.notification.findMany({ orderBy: { updatedAt: 'desc' } })
}

export const recentNotifications = async () => {
  return await db.notification.findMany({
    where: { updatedAt: { gte: recent } },
    orderBy: { updatedAt: 'desc' },
  })
}

export const recentNotificationCount = async () => {
  return await db.notification.count({
    where: { updatedAt: { gte: recently } },
  })
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
