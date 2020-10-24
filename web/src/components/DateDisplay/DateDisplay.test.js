import { render } from '@redwoodjs/testing'

import DateDisplay from './DateDisplay'

describe('DateDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DateDisplay />)
    }).not.toThrow()
  })
})
