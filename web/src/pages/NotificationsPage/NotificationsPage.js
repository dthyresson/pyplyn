import AppLayout from 'src/layouts/AppLayout'

import NotificationsCell from 'src/components/NotificationsCell'

const NotificationsPage = () => {
  return (
    <AppLayout>
      <div className="mt-2 pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Notifications
        </h3>
      </div>

      <NotificationsCell />
    </AppLayout>
  )
}

export default NotificationsPage
