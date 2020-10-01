import AppLayout from 'src/layouts/AppLayout'
import TweetsCell from 'src/components/TweetsCell'

const TweetsPage = ({ page = 1 }) => {
  return (
    <AppLayout>
      <TweetsCell page={page}></TweetsCell>
    </AppLayout>
  )
}

export default TweetsPage
