import { useMutation } from "@tanstack/react-query";
import { ShowErrorToast } from "../services/toastService";
import { userLogin,userSignup } from "../api/apiLogin";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: () => {
      window.location.replace("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      ShowErrorToast(error?.response?.data?.message || error?.message);
    },
  });

  
  const signupMutation = useMutation({
    mutationFn: (credentials) => userSignup(credentials),
    onSuccess: () => {
      navigate("/login", { state: { showSuccess: true } });
    },
    onError: (error) => {
      ShowErrorToast(error?.response?.data?.message || error?.message);
    },
  });

  return { loginMutation,signupMutation };
};
export default useAuth;
