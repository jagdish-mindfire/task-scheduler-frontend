import axios from 'axios';
import { LocalKeys, SetLocalAsString, RemoveLocal ,GetLocalAsString} from "../services/localStorage";

//apply base url for axios
const API_URL = import.meta.env.VITE_API_URL + "/auth";
const LOGIN_URL = '/login';
const LOGOUT_URL ='/logout';
const SIGNUP_URL = '/signup';


export const axiosApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const userLogin = async (payload) => {
    RemoveLocal(LocalKeys.REFRESH_TOKEN);
    RemoveLocal(LocalKeys.ACCESS_TOKEN);
    
    const requestOptions = {
        method: "POST",
        data: {email:payload?.email, password:payload?.password}
      };
    const response = await axiosApi(LOGIN_URL, requestOptions);
    const result = response.data ? response.data : response;
    if (result?.refresh_token) {
        const refreshToken = result?.refresh_token;
        SetLocalAsString(LocalKeys.REFRESH_TOKEN, refreshToken)
    }else{
        RemoveLocal(LocalKeys.REFRESH_TOKEN)
        throw new Error('Invalid credentials');
    }
    return response;
};

export const userSignup = async (payload) => {    
    const requestOptions = {
        method: "POST",
        data: {email:payload?.email, name:payload?.name,password:payload?.password}
      };
    return axiosApi(SIGNUP_URL, requestOptions);
};

export const userLogout = async () => {
    const refreshToken = GetLocalAsString(LocalKeys.REFRESH_TOKEN);
    RemoveLocal(LocalKeys.REFRESH_TOKEN);
    RemoveLocal(LocalKeys.ACCESS_TOKEN);
    const requestOptions = {
        method: "POST",
        data: {refresh_token:refreshToken},
    };
    return axiosApi(LOGOUT_URL, requestOptions);
}
