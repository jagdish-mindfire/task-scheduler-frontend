'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ShowErrorToast, ShowSuccessToast } from '@/app/services/toastService';
import { userLogin, userSignup } from '@/app/services/loginApiService';
import { pageRoutes } from '../constants/endpoints';

const useAuth = () => {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: () => {
      window.location.replace(pageRoutes.HOME_PAGE);
      ShowSuccessToast("You're now logged in! Welcome back.");
    },
    onError: (error) => {
      console.log(error);
      ShowErrorToast(error?.response?.data?.message || error?.message);
    },
    retry: false, // Disable retry for login mutation
  });

  const signupMutation = useMutation({
    mutationFn: (credentials) => userSignup(credentials),
    onSuccess: () => {
      router.push(pageRoutes.LOGIN_PAGE);
      ShowSuccessToast('Account Created Successfully,Login to continue');
    },
    onError: (error) => {
      ShowErrorToast(error?.response?.data?.message || error?.message);
    },
    retry: false, // Disable retry for singup mutation
  });

  return { loginMutation, signupMutation };
};
export default useAuth;
