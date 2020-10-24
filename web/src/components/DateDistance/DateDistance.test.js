import { render } from '@redwoodjs/testing'

import DateDistance from './DateDistance'

describe('DateDistance', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DateDistance />)
    }).not.toThrow()
  })
})
