import { appApi } from "./apiService";
import { endpoints } from "../constants/endpoints";
const api = new appApi();

export const fetchUserDetails = async () => {
    const response = await api.get(endpoints.ME_ENDPOINT);
    return response;
  };