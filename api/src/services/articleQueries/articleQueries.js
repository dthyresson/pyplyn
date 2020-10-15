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

export const articlesForLabel = async ({ label }) => {
  const safeLabel = unescape(label)
    .replace("'", "''")
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const SQL = `SELECT a.*
  FROM
	  "Article" a
	JOIN "Tag" AS g ON g. "articleId" = a. "id"
  WHERE
	  lower(g.label) = lower('${safeLabel}')
    AND g. "articleId" IS NOT NULL
  ORDER BY a."publishedAt" DESC
  `

  return await db.$queryRaw(SQL)
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
