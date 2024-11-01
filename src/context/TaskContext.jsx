import React, { createContext, useEffect, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [allNotifications,setAllNotifications] = useState([]);
  const [notificationCount,setNotificationCount] = useState(0);
  const [taskLoader, setTaskLoader] = useState(true);
  const [task,setTask] = useState({});

  
  useEffect(()=>{
    setNotificationCount(allNotifications.reduce((acc,notification)=>!notification?.isRead ?  acc + 1 : acc,0));
  },[allNotifications])

  return (
    <TaskContext.Provider value={{taskList, setTaskList,allNotifications,setAllNotifications,notificationCount,taskLoader, setTaskLoader,task,setTask }}>
      {children}
    </TaskContext.Provider>
  );
};
