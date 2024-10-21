import axios from 'axios';
import { GetLocalAsString,LocalKeys,SetLocalAsString } from '../services/localStorage';

const IsLoggedIn = async () => {
    const currentRefreshToken = GetLocalAsString(LocalKeys.REFRESH_TOKEN);
    const currentAccessToken = GetLocalAsString(LocalKeys.ACCESS_TOKEN);
    const apiUrl = import.meta.env.VITE_API_URL;
   
    let token = null;
    try {
      if(!currentAccessToken || (JSON.parse(atob(currentAccessToken.split('.')[1]))).exp * 1000 < new Date().getTime() ){
        let { data } = await axios.post(apiUrl + "/auth/token", {
          refresh_token: currentRefreshToken,
        });
        token = data.access_token;
        SetLocalAsString(LocalKeys.ACCESS_TOKEN,token);
      }else{
        return true;
      }
    } catch (error) {
      return false;
    }
};

export default IsLoggedIn;
