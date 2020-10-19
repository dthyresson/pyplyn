import { render } from '@redwoodjs/testing'

import LoadingMessage from './LoadingMessage'

describe('LoadingMessage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingMessage />)
    }).not.toThrow()
  })
})
