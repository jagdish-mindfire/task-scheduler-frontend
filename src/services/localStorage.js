export const localKeys = {
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN: 'access_token',
}

export const setLocalAsString = (key, data) => {
  localStorage.setItem(key, data)
}

export const getLocalAsString = (key) => {
  const data = localStorage.getItem(key)
  return data
}

export const removeLocal = (key) => {
  localStorage.removeItem(key)
}
