import AppLayout from 'src/layouts/AppLayout'
import TagsCell from 'src/components/TagsCell'

const TagsPage = ({ page = 1 }) => {
  return (
    <AppLayout>
      <TagsCell page={page}></TagsCell>
    </AppLayout>
  )
}

export default TagsPage
