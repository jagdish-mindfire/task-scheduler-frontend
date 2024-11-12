import axios from 'axios';
import {
  localKeys,
  setLocalAsString,
  removeLocal,
  getLocalAsString,
} from '../services/localStorage';
import { nextApiEndpoints } from '../constants/endpoints';

export const axiosApi = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userLogin = async (payload) => {
  removeLocal(localKeys.REFRESH_TOKEN);
  removeLocal(localKeys.ACCESS_TOKEN);

  const requestOptions = {
    method: 'POST',
    data: { email: payload?.email, password: payload?.password },
  };
  const response = await axiosApi(nextApiEndpoints.LOGIN, requestOptions);
  const result = response.data ? response.data : response;
  if (result) {
  } else {
    throw new Error('Invalid credentials');
  }
  return response;
};

export const userSignup = async (payload) => {
  const requestOptions = {
    method: 'POST',
    data: {
      email: payload?.email,
      name: payload?.name,
      password: payload?.password,
    },
  };
  return axiosApi(nextApiEndpoints.SIGNUP, requestOptions);
};

export const userLogout = async () => {
  const requestOptions = {
    method: 'POST',
  };
  return axiosApi(nextApiEndpoints.LOGOUT, requestOptions);
};
