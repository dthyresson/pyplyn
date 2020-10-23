import { render } from '@redwoodjs/testing'

import TweetListItem from './TweetListItem'

describe('TweetListItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TweetListItem />)
    }).not.toThrow()
  })
})
