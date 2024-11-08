import moment from 'moment'
const NotificationItem = ({ notification, clearNotification }) => {
  return (
    <div className="block px-4 py-2 text-sm  bg-zinc-50 text-gray-700 data-[focus]:bg-zinc-200 border border-gray-300 m-1 rounded relative">
      {/* Cross Icon to clear individual notification */}
      <label
        data-testid="clear_notification"
        onClick={(e) => {
          e.stopPropagation()
          clearNotification(notification._id)
        }}
        className="absolute top-1 right-2 text-gray-500 hover:text-red-600"
      >
        &times; {/* Cross icon */}
      </label>

      <span className="text-zinc-900 font-bold">
        {notification?.notificationType === 'overdue' ? (
          <span>
            {' '}
            You missed the deadline for <b>{notification?.title}</b>. Complete
            it as soon as possible.{' '}
          </span>
        ) : (
          <span>
            {' '}
            The deadline for <b>{notification?.title}</b> is approaching. You
            have less than an hour to complete it.{' '}
          </span>
        )}
      </span>

      <div>
        <span>Due Date: {moment(notification?.dueDate).format('lll')}</span>
      </div>
    </div>
  )
}
export default NotificationItem
