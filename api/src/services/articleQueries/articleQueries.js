import { db } from 'src/lib/db'

export const articleById = ({ id }) => {
  return db.article.findOne({ where: { id: id }, include: { entry: true } })
}

export const articleByEntryId = ({ entryId }) => {
  return db.article.findOne({ where: { entryId: entryId } })
}

export const articleByDocumentId = ({ documentId }) => {
  return db.entry.findOne({ where: { uid: documentId } }).article()
}

export const paginateArticles = async ({
  page = 1,
  limit = 20,
  order = { publishedAt: 'desc' },
}) => {
  page = page < 1 ? 1 : page

  const offset = (page - 1) * limit

  return {
    articles: db.article.findMany({
      include: { tweets: true, tags: true },
      take: limit,
      skip: offset,
      orderBy: order,
    }),
    pagination: {
      limit: limit,
      offset: offset,
      total: db.article.count(),
    },
  }
}
