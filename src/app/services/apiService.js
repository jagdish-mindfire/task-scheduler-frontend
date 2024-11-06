import { axiosClient } from "@/app/config/apiConfig";

class appApi {
    /**
     * Fetches data from given url
     */
    get = async (url, params) => {
        if (params !== undefined) {
            //wrap params within params object
            params = {
                params: params
            }
        }
        return axiosClient.get(url, params);
    };

    /**
     * post given data to url
     */
    post =(url, data) => {
        return axiosClient.post(url, data);
    };

    /**
     * Updates data
     */
    update = (url, data) => {
        return axiosClient.patch(url, data);
    };

    /**
     * Delete 
     */
    delete = (url, data) => {
        return axiosClient.delete(url, { ...data });
    };
    
};



export { appApi };