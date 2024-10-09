import axios from "axios";

const signupAPI = async ({ email,name, password }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await axios.post(apiUrl + "/auth/signup", {
    email,
    password,
    name
  });
  return response?.data;
};

export default signupAPI;
