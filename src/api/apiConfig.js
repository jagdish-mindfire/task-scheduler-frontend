import axios from "axios";
import { GetLocalAsString, LocalKeys, SetLocalAsString } from "../services/localStorage";

const API_URL = import.meta.env.VITE_API_URL ;


export const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// intercepting to capture errors
axiosClient.interceptors.response.use(function (response) {
    const data = response.data ? response.data : response
    return data;
}, function (error) {
    let message;
    let status = error?.response?.status;
    if (Number(status) === 401) {
        window.location.href = "/login";
        return Promise.reject(message);
    }
    return Promise.reject(error);
});

// Request Interceptor to Add Authorization Token
axiosClient.interceptors.request.use(async function (config) {
    const refreshToken = GetLocalAsString(LocalKeys.REFRESH_TOKEN);
    let accessToken = GetLocalAsString(LocalKeys.ACCESS_TOKEN);
    if(!accessToken || (JSON.parse(atob(accessToken.split('.')[1]))).exp * 1000 < new Date().getTime() ){
        try {
            let { data } = await axios.post(API_URL + '/auth/token', {refresh_token:refreshToken});
            accessToken =  data?.access_token;
            SetLocalAsString(LocalKeys.ACCESS_TOKEN,accessToken);
        } catch (error) {
            console.log(error);
        }

    }

    if (accessToken) {
        // Attach the token to the Authorization header
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, function (error) {
    // Handle the request error here
    return Promise.reject(error);
});
