import AppLayout from 'src/layouts/AppLayout'
import ArticlesCell from 'src/components/ArticlesCell'

const ArticlesPage = ({ page = 1 }) => {
  return (
    <AppLayout>
      <ArticlesCell page={page}></ArticlesCell>
    </AppLayout>
  )
}

export default ArticlesPage
