import { render } from '@redwoodjs/testing'

import TagsPage from './TagsPage'

describe('TagsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TagsPage />)
    }).not.toThrow()
  })
})
