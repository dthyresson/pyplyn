// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/logout" page={LogoutPage} name="logout" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/" page={HomePage} name="home" />

      <Route path="/article/{id}" page={ArticlePage} name="article" />
      <Route path="/articles" page={ArticlesPage} name="articles" />

      <Route path="/tweet/{id}" page={TweetPage} name="tweet" />
      <Route path="/tweets" page={TweetsPage} name="tweets" />

      <Route path="/tag/{label}" page={TagPage} name="tag" />
      <Route path="/tags" page={TagsPage} name="tags" />

      <Private unauthenticated="login">
        <Route path="/jobs" page={RepeaterJobsPage} name="jobs" />
        <Route path="/job/{name}" page={RepeaterJobPage} name="job" />
      </Private>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
