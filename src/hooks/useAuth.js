import { useMutation } from '@tanstack/react-query'
import { showErrorToast, showSuccessToast } from '../services/toastService'
import { userLogin, userSignup } from '../api/apiLogin'
import { useNavigate,useLocation } from 'react-router-dom'

const useAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const loginMutation = useMutation({
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: () => {
      const redirectPath = location.state?.from || '/dashboard'
      navigate(redirectPath,{ replace: true })

      showSuccessToast("You're now logged in! Welcome back.")
    },
    onError: (error) => {
      console.log(error)
      showErrorToast(error?.response?.data?.message || error?.message)
    },
    retry: false, // Disable retry for login mutation
  })

  const signupMutation = useMutation({
    mutationFn: (credentials) => userSignup(credentials),
    onSuccess: () => {
      navigate('/login', { state: { showSuccess: true } })
      showSuccessToast('Account Created Successfully,Login to continue')
    },
    onError: (error) => {
      showErrorToast(error?.response?.data?.message || error?.message)
    },
    retry: false, // Disable retry for singup mutation
  })

  return { loginMutation, signupMutation }
}
export default useAuth
