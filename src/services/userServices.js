import { appApi } from '../config/api'

const api = new appApi()
const USERS_ENDPOINT = '/user'
const ME_ENDPOINT = USERS_ENDPOINT + '/me'

export const fetchUserDetails = async () => {
  const response = await api.get(ME_ENDPOINT)
  return response
}
