import axios from "axios";

const loginAPI = async ({ email, password }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await axios.post(apiUrl + "/auth/login", {
    email,
    password,
  });
  return response?.data;
};

export default loginAPI;
