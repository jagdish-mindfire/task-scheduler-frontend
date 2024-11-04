import { useMutation } from "@tanstack/react-query";
import { ShowErrorToast, ShowSuccessToast } from "../services/toastService";
import { userLogin,userSignup } from "../api/apiLogin";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: () => {
      // window.location.replace("/home");
      navigate("/home", { state: { showSuccess: true } });

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
      navigate("/login", { state: { showSuccess: true } });
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
