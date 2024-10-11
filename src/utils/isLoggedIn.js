import axios from 'axios';

const IsLoggedIn = async () => {
    const currentRefreshToken = localStorage.getItem("refresh_token");
    const apiUrl = import.meta.env.VITE_API_URL;

    let token = null;
    try {
      let { data } = await axios.post(apiUrl + "/auth/token", {
        refresh_token: currentRefreshToken,
      });
      token = data.access_token;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
};

export default IsLoggedIn;
