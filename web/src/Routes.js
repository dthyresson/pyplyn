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
      <Route path="/" page={HomePage} name="home" />

      <Route path="/signup" page={SignUpPage} name="signUp" />
      <Route path="/login" page={SignInPage} name="signIn" />

      <Route path="/about" page={AboutPage} name="about" />

      <Route path="/article/{id}" page={ArticlePage} name="article" />
      <Route path="/articles" page={ArticlesPage} name="articles" />

      <Route path="/tweet/{id}" page={TweetPage} name="tweet" />
      <Route path="/tweets" page={TweetsPage} name="tweets" />

      <Route path="/tag/{label}" page={TagPage} name="tag" />
      <Route path="/tags" page={TagsPage} name="tags" />

      <Private unauthenticated="signIn">
        <Route path="/settings" page={SettingsPage} name="settings" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/jobs" page={RepeaterJobsPage} name="jobs" />
        <Route path="/job/{name}" page={RepeaterJobPage} name="job" />
        <Route
          path="/notifications"
          page={NotificationsPage}
          name="notifications"
        />
      </Private>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
