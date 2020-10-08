import AppLayout from 'src/layouts/AppLayout'
import ArticleCell from 'src/components/ArticleCell'

const ArticlePage = ({ id }) => {
  return (
    <AppLayout>
      <ArticleCell id={id}></ArticleCell>
    </AppLayout>
  )
}

export default ArticlePage
