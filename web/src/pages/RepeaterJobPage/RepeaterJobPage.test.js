import { render } from '@redwoodjs/testing'

import RepeaterJobPage from './RepeaterJobPage'

describe('RepeaterJobPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RepeaterJobPage />)
    }).not.toThrow()
  })
})
