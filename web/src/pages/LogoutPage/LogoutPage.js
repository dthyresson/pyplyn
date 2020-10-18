import { Link, routes } from '@redwoodjs/router'

const LogoutPage = () => {
  return (
    <>
      <h1>LogoutPage</h1>
      <p>
        Find me in <code>./web/src/pages/LogoutPage/LogoutPage.js</code>
      </p>
      <p>
        My default route is named <code>logout</code>, link to me with `
        <Link to={routes.logout()}>Logout</Link>`
      </p>
    </>
  )
}

export default LogoutPage
