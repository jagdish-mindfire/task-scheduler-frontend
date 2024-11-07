"use client"
import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation';

import { ShowErrorToast, ShowSuccessToast } from "@/app/services/toastService";
import { userLogin,userSignup } from "@/app/services/loginApiService";

const useAuth = () => {
//   const navigate = useNavigate();
const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: () => {
      // window.location.replace("/home");
      router.push('/home')
    //   navigate("/home", { state: { showSuccess: true } });

      ShowSuccessToast("You're now logged in! Welcome back.");
    },
    onError: (error) => {
      console.log(error);
      ShowErrorToast(error?.response?.data?.message || error?.message);
    },
    retry: false,  // Disable retry for login mutation
  });

  
  const signupMutation = useMutation({
    mutationFn: (credentials) => userSignup(credentials),
    onSuccess: () => {
      router.push('/login')
    //   navigate("/login", { state: { showSuccess: true } });
      ShowSuccessToast("Account Created Successfully,Login to continue");
    },
    onError: (error) => {
      ShowErrorToast(error?.response?.data?.message || error?.message);
    },
    retry: false,  // Disable retry for singup mutation

  });

  return { loginMutation,signupMutation };
};
export default useAuth;