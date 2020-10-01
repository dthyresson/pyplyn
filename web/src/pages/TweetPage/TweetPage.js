import AppLayout from 'src/layouts/AppLayout'
import TweetCell from 'src/components/TweetCell'

const TweetPage = ({ id }) => {
  return (
    <AppLayout>
      <TweetCell id={id}></TweetCell>
    </AppLayout>
  )
}

export default TweetPage
