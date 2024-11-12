import axios from "axios";
import { getLocalAsString, localKeys, setLocalAsString } from "@/app/services/localStorage";
import { nextApiEndpoints, pageRoutes } from "../constants/endpoints";


const API_URL = process.env.NEXT_PUBLIC_API_URL ;


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
        window.location.href = pageRoutes.LOGIN_PAGE;
        return Promise.reject(message);
    }
    return Promise.reject(error);
});

// Request Interceptor to Add Authorization Token
axiosClient.interceptors.request.use(async function (config) {
    let accessToken = getLocalAsString(localKeys.ACCESS_TOKEN);
    // min 2
    if(!accessToken || (JSON.parse(atob(accessToken.split('.')[1]))).exp * 1000 < new Date().getTime() ){
        try {
            let { data } = await axios.post(nextApiEndpoints.TOKEN);
            accessToken =  data?.access_token;
            setLocalAsString(localKeys.ACCESS_TOKEN,accessToken);
        } catch (error) {
            console.log(error);
            // window.location.href = pageRoutes.LOGIN_PAGE;
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