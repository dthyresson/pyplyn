import AppLayout from 'src/layouts/AppLayout'
import TagSummariesCell from 'src/components/TagSummariesCell'
import ArticlesForTagCell from 'src/components/ArticlesForTagCell'
import TweetsForTagCell from 'src/components/TweetsForTagCell'

const TagPage = ({ label }) => {
  return (
    <AppLayout>
      <TagSummariesCell label={label} />
      <div className="">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-2 pr-2">
          <TweetsForTagCell label={label} />
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-2 pr-2">
          <ArticlesForTagCell label={label} />
        </div>
      </div>
    </AppLayout>
  )
}

export default TagPage
