import AppLayout from 'src/layouts/AppLayout'
import TweetsCell from 'src/components/TweetsCell'

// import { Link, routes } from '@redwoodjs/router'
import { useParams } from '@redwoodjs/router'

const TweetsPage = () => {
  let { page } = useParams()
  page = page || 1

  return (
    <AppLayout>
      <div className="mb-5 pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Tweets</h3>
      </div>
      <TweetsCell page={page}></TweetsCell>
    </AppLayout>
  )
}

export default TweetsPage
