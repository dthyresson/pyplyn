import AppLayout from 'src/layouts/AppLayout'
import TagSummariesCell from 'src/components/TagSummariesCell'

const TagPage = ({ label }) => {
  return (
    <AppLayout>
      <TagSummariesCell label={label} />
    </AppLayout>
  )
}

export default TagPage
