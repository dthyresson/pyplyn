import { render } from '@redwoodjs/testing'

import PeriodTotalStat from './PeriodTotalStat'

describe('PeriodTotalStat', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PeriodTotalStat />)
    }).not.toThrow()
  })
})
