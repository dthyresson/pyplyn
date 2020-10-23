import { render } from '@redwoodjs/testing'

import NotificationsPage from './NotificationsPage'

describe('NotificationsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotificationsPage />)
    }).not.toThrow()
  })
})
