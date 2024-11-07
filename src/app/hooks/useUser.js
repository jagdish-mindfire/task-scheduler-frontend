"use client"
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { UserContext } from "../context/UserContext";
import { ShowErrorToast } from "../services/toastService";
import { fetchUserDetails } from "../services/userService";

const useUser = () => {
  const { setUserData } = useContext(UserContext);
  const queryClient = useQueryClient();

  // Function to trigger the data fetching
  const getUserDetails = async () => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ["userDetails"],
        queryFn: fetchUserDetails,
      });
      // Update the context or state with fetched user data
      setUserData(data);
    } catch (error) {
      // Show error toast if there's an error during the request
      ShowErrorToast(error?.response?.data?.message || error?.message);
    }
  };

  return { getUserDetails };
};

export default useUser;