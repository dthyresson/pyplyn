import { db } from 'src/lib/db'

export const articles = () => {
  return db.article.findMany()
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
  articleCategories: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).articleCategories(),
  summaries: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).summaries(),
  articlePriorities: (_obj, { root }) =>
    db.article.findOne({ where: { id: root.id } }).articlePriorities(),
}
