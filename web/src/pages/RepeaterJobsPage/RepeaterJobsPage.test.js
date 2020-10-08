import { render } from '@redwoodjs/testing'

import RepeaterJobsPage from './RepeaterJobsPage'

describe('RepeaterJobsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RepeaterJobsPage />)
    }).not.toThrow()
  })
})
