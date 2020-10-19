import { render } from '@redwoodjs/testing'

import EmptyMessage from './EmptyMessage'

describe('EmptyMessage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmptyMessage />)
    }).not.toThrow()
  })
})
