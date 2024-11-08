import { appApi } from '../config/api'

const api = new appApi()
const NOTIFICATION_ENDPOINT = '/notifications'
const CLEAR_NOTIFICATION_ENDPOINT = NOTIFICATION_ENDPOINT + '/clear'

export const fetchAllNotifications = async () => {
  const response = await api.get(NOTIFICATION_ENDPOINT)
  return response
}

export const clearNotifications = async (notificationIds) => {
  const response = await api.post(CLEAR_NOTIFICATION_ENDPOINT, {
    notificationIds,
  })
  return response
}
