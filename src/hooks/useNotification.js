
import { useContext, useEffect } from "react";
import useCallAPI from './useCallAPI';
import { TaskContext } from "../context/TaskContext";
const useNotification = () => {
    const { callAuthAPI } = useCallAPI();
    const { setAllNotifications } = useContext(TaskContext);
    const getAllNotifications = async () => {
        try {
            const response = await callAuthAPI({ url: '/notification/', method: 'GET' });
            setAllNotifications(response?.data || []);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getAllNotifications();
    })
}
export default useNotification;