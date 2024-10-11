import axios from 'axios';
import { GetLocalAsString,LocalKeys } from '../services/localStorage';

const IsLoggedIn = async () => {
    const currentRefreshToken = GetLocalAsString(LocalKeys.REFRESH_TOKEN);
    const apiUrl = import.meta.env.VITE_API_URL;
   
    let token = null;
    try {
      let { data } = await axios.post(apiUrl + "/auth/token", {
        refresh_token: currentRefreshToken,
      });
      console.log('from middleware');
      console.log(data);
      token = data.access_token;
    
      return token;
    } catch (error) {
      console.log(error);
      return false;
    }
};

export default IsLoggedIn;
