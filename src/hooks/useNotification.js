
import { useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { FetchAllNotifications,ClearNotifications } from "../services/notificationService";
import { ShowNotificationToast,ShowErrorToast } from "../services/toastService";

const useNotification = () => {
    const { allNotifications, setAllNotifications } = useContext(TaskContext);

    const fetchAllNotifications = async () => {
        try {
            const notifications = await FetchAllNotifications();
            setAllNotifications(notifications || []);
        } catch (error) {
            console.log(error);
        }
    };

    const clearNotification = async (notificationId) => {
      try {
        await ClearNotifications([notificationId]);
        setAllNotifications((prev) => {
          return prev.filter((noti) => {
            return noti._id !== notificationId;
          });
        });
      } catch (error) {
        ShowErrorToast(error?.message);
      }
    };
  
    const handleIncomingNotification = async (data) => {
      ShowNotificationToast({type:data[0].notificationType,data:data[0]});
      setAllNotifications(prev=>[data[0],...prev]);
  };
  
    const clearAllNotifications = async () => {
      try {
        await ClearNotifications([...allNotifications.map((noti) => noti._id)])
        setAllNotifications([]);
      } catch (error) {
        ShowErrorToast(error?.message);
      }
    };

    return {fetchAllNotifications,clearNotification,clearAllNotifications,handleIncomingNotification};
}
export default useNotification;