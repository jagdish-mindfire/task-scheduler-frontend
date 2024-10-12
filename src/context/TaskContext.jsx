import React, { createContext, useEffect, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [allNotifications,setAllNotifications] = useState([]);
  const [notificationCount,setNotificationCount] = useState(0);

  
  useEffect(()=>{
    setNotificationCount(allNotifications.reduce((acc,notification)=>!notification?.isRead ?  acc + 1 : acc,0));
  },[allNotifications])

  return (
    <TaskContext.Provider value={{taskList, setTaskList,allNotifications,setAllNotifications,notificationCount }}>
      {children}
    </TaskContext.Provider>
  );
};
