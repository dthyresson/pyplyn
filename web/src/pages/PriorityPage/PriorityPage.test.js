import { render } from '@redwoodjs/testing'

import PriorityPage from './PriorityPage'

describe('PriorityPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PriorityPage />)
    }).not.toThrow()
  })
})
