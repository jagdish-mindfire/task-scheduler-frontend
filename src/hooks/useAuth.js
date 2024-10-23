// import { useMutation } from "@tanstack/react-query";
import { ShowErrorToast, ShowSuccessToast } from "../services/toastService";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import authClient from "../graphql/authClient";
import {
  localKeys,
  setLocalAsString,
  removeLocal,
} from "../services/localStorage";
import CONSTANTS_STRING from "../constants/strings";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/mutations";

const useAuth = () => {
  const navigate = useNavigate();

  const [loginMutation, { loading: loginLoading }] = useMutation(
    LOGIN_MUTATION,
    { client: authClient }
  );
  const [signupMutation, { loading: signupLoading }] = useMutation(
    SIGNUP_MUTATION,
    { client: authClient }
  );

  const login = async ({ email, password }) => {
    try {
      const response = await loginMutation({ variables: { email, password } });
      removeLocal(localKeys.REFRESH_TOKEN);
      removeLocal(localKeys.ACCESS_TOKEN);
      console.log(response.data.login.refreshToken);
      setLocalAsString(
        localKeys.REFRESH_TOKEN,
        response.data.login.refreshToken
      );
      navigate("/dashboard");
    } catch (error) {
      ShowErrorToast(error.message || CONSTANTS_STRING.SOMETHING_WENT_WRONG);
    }
  };

  const signup = async ({ email, password, name }) => {
    try {
      console.log("adf");
      const response = await signupMutation({
        variables: { email, password, name },
      });
      ShowSuccessToast(response.data.signup.message);
      navigate("/login");
    } catch (error) {
      ShowErrorToast(error.message || CONSTANTS_STRING.SOMETHING_WENT_WRONG);
    }
  };

  return { login, signup, loginLoading, signupLoading };
};
export default useAuth;
