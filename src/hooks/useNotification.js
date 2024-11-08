import { useContext, useEffect } from 'react'
import { TaskContext } from '../context/TaskContext'
import {
  fetchAllNotifications,
  clearNotifications,
} from '../services/notificationService'
import { showNotificationToast, showErrorToast } from '../services/toastService'

const useNotification = () => {
  const { allNotifications, setAllNotifications } = useContext(TaskContext)

  const fetchAllNotifications = async () => {
    try {
      const notifications = await fetchAllNotifications()
      setAllNotifications(notifications || [])
    } catch (error) {
      console.log(error)
    }
  }

  const clearNotification = async (notificationId) => {
    try {
      await clearNotifications([notificationId])
      setAllNotifications((prev) => {
        return prev.filter((noti) => {
          return noti._id !== notificationId
        })
      })
    } catch (error) {
      showErrorToast(error?.message)
    }
  }

  const handleIncomingNotification = async (data) => {
    showNotificationToast({ type: data[0].notificationType, data: data[0] })
    setAllNotifications((prev) => [data[0], ...prev])
  }

  const clearAllNotifications = async () => {
    try {
      await clearNotifications([...allNotifications.map((noti) => noti._id)])
      setAllNotifications([])
    } catch (error) {
      showErrorToast(error?.message)
    }
  }

  return {
    fetchAllNotifications,
    clearNotification,
    clearAllNotifications,
    handleIncomingNotification,
  }
}
export default useNotification
