import { db } from 'src/lib/db'

export const articles = () => {
  return db.article.findMany()
}

export const article = ({ id }) => {
  return db.article.findOne({
    where: { id },
  })
}

export const createArticle = ({ input }) => {
  return db.article.create({
    data: input,
  })
}

export const updateArticle = ({ id, input }) => {
  return db.article.update({
    data: input,
    where: { id },
  })
}

export const deleteArticle = ({ id }) => {
  return db.article.delete({
    where: { id },
  })
}

export const Article = {
  entry: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).entry(),
  articleContext: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).articleContext(),
  tags: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).tags(),
  tweets: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).tweets(),
}
