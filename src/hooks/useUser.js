import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { showErrorToast } from '../services/toastService'
import { fetchUserDetails } from '../services/userServices'
import { useQueryClient } from '@tanstack/react-query'

const useUser = () => {
  const { setUserData } = useContext(UserContext)
  const queryClient = useQueryClient()

  // Function to trigger the data fetching
  const getUserDetails = async () => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: 'userDetails',
        queryFn: fetchUserDetails,
      })
      // Update the context or state with fetched user data
      setUserData(data)
    } catch (error) {
      // Show error toast if there's an error during the request
      showErrorToast(error?.response?.data?.message || error?.message)
    }
  }

  return { getUserDetails }
}

export default useUser
