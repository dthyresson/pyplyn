import { Helmet } from 'react-helmet'

import AppLayout from 'src/layouts/AppLayout'
import TweetsCell from 'src/components/TweetsCell'

const TweetsPage = ({ page = 1 }) => {
  return (
    <AppLayout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>pyplyn - Tweets</title>
      </Helmet>
      <TweetsCell page={page}></TweetsCell>
    </AppLayout>
  )
}

export default TweetsPage
