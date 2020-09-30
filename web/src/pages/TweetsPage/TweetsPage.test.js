import { render } from '@redwoodjs/testing'

import TweetsPage from './TweetsPage'

describe('TweetsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TweetsPage />)
    }).not.toThrow()
  })
})
