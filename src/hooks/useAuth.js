import { useMutation } from '@tanstack/react-query'
import { showErrorToast, showSuccessToast } from '../services/toastService'
import { userLogin, userSignup } from '../config/apiLogin'
import { useNavigate,useLocation } from 'react-router-dom'
import CONSTANTS_STRING from '../constants/strings'

const useAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const loginMutation = useMutation({
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: () => {
      const redirectPath = location.state?.from || '/home'
      navigate(redirectPath,{ replace: true })
      showSuccessToast(CONSTANTS_STRING.LOGIN_SUCCESS_MESSAGE);
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
      showSuccessToast(CONSTANTS_STRING.SIGNUP_SUCCESS_MESSAGE);
    },
    onError: (error) => {
      showErrorToast(error?.response?.data?.message || error?.message)
    },
    retry: false, // Disable retry for singup mutation
  })

  return { loginMutation, signupMutation }
}
export default useAuth
