import { render } from '@redwoodjs/testing'

import TweetPage from './TweetPage'

describe('TweetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TweetPage />)
    }).not.toThrow()
  })
})
