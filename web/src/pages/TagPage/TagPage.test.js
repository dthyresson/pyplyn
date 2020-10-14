import { render } from '@redwoodjs/testing'

import TagPage from './TagPage'

describe('TagPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TagPage />)
    }).not.toThrow()
  })
})
