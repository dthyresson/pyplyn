import { render } from '@redwoodjs/testing'

import CalendarChart from './CalendarChart'

describe('CalendarChart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarChart />)
    }).not.toThrow()
  })
})
