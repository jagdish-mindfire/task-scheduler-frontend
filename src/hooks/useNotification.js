
import { useContext, useEffect } from "react";
import useCallAPI from './useCallAPI';
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from '../context/AuthContext';
import io from "socket.io-client";
import ShowTaskNotification from "../utils/ShowTaskNotification";


const useNotification = () => {
    const { callAuthAPI } = useCallAPI();
    const { allNotifications, setAllNotifications } = useContext(TaskContext);
    const { accessToken } = useContext(AuthContext);

    const fetchAllNotifications = async () => {
        try {
            const response = await callAuthAPI({ url: '/notifications/', method: 'GET' });
            setAllNotifications(response?.data || []);
            console.log('All Notifications fetched:', response?.data);
        } catch (error) {
            console.log(error);
        }
    };
    

    // useEffect(() => {
    //     const apiUrl =import.meta.env.VITE_API_URL;
    //     if(accessToken){
    //       try {
    //         const newSocket = io(apiUrl + '?token='+accessToken);
  
    //         newSocket.on("notification", (response) => {
    //           const tasks = response?.data;
    //           tasks.map(task=>ShowTaskNotification(task?.title,task?.dueDate,task?.notificationType));
    //           setAllNotifications((prev)=>{
    //             return [...tasks,...prev];
    //           });
  
    //         });          
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     }
    //   },[accessToken]);

    const clearNotification = async (notificationId) => {
      try {
        await callAuthAPI({
          url: "/notifications/clear/",
          method: "POST",
          data: { notificationIds: [notificationId] },
        });
        setAllNotifications((prev) => {
          return prev.filter((noti) => {
            return noti._id !== notificationId;
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const clearAllNotifications = async (notificationId) => {
      try {
        await callAuthAPI({
          url: "/notifications/clear/",
          method: "POST",
          data: {
            notificationIds: [...allNotifications.map((noti) => noti._id)],
          },
        });
        setAllNotifications([]);
      } catch (error) {
        console.log(error);
      }
    };

    return {fetchAllNotifications,clearNotification,clearAllNotifications};
}
export default useNotification;