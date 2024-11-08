import axios from 'axios'
import {
  getLocalAsString,
  localKeys,
  setLocalAsString,
} from '../utils/localStorage'

const IsLoggedIn = async () => {
  const currentRefreshToken = getLocalAsString(localKeys.REFRESH_TOKEN)
  const currentAccessToken = getLocalAsString(localKeys.ACCESS_TOKEN)
  const apiUrl = import.meta.env.VITE_API_URL

  let token = null
  try {
    if (
      !currentAccessToken ||
      JSON.parse(atob(currentAccessToken.split('.')[1])).exp * 1000 <
        new Date().getTime()
    ) {
      let { data } = await axios.post(apiUrl + '/auth/token', {
        refresh_token: currentRefreshToken,
      })
      token = data.access_token
      setLocalAsString(localKeys.ACCESS_TOKEN, token)
    }
    return true
  } catch (error) {
    return false
  }
}

export default IsLoggedIn
