import { render } from '@redwoodjs/testing'

import PercentChangeBadge from './PercentChangeBadge'

describe('PercentChangeBadge', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PercentChangeBadge />)
    }).not.toThrow()
  })
})
