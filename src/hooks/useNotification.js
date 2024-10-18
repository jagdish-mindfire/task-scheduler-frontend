
import { useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { FetchAllNotifications,ClearNotifications } from "../services/notificationService";
import { ShowNotificationToast } from "../services/toastService";

const useNotification = () => {
    const { allNotifications, setAllNotifications } = useContext(TaskContext);

    const fetchAllNotifications = async () => {
        try {
            const notifications = await FetchAllNotifications();
            setAllNotifications(notifications || []);
        } catch (error) {
            console.log('here is error');
            console.log(error);
        }
    };
    
    const addNotification = async (notification) => {
        setAllNotifications((prev)=>{
          return [notification,...prev];
        });
    };

    // useEffect(()=>{
    //   ShowNotificationToast({type:'due'});
    // },[]);
    // const updateNotification = (data)=> {

    // };

    const clearNotification = async (notificationId) => {
      try {
        await ClearNotifications([notificationId]);
        setAllNotifications((prev) => {
          return prev.filter((noti) => {
            return noti._id !== notificationId;
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const clearAllNotifications = async () => {
      try {
        await ClearNotifications([...allNotifications.map((noti) => noti._id)])
        setAllNotifications([]);
      } catch (error) {
        console.log(error);
      }
    };

    return {fetchAllNotifications,clearNotification,clearAllNotifications};
}
export default useNotification;