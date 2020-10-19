import { render } from '@redwoodjs/testing'

import FailureMessage from './FailureMessage'

describe('FailureMessage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FailureMessage />)
    }).not.toThrow()
  })
})
