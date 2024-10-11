import React, { createContext, useEffect, useState } from 'react';
import useCallAPI from '../hooks/useCallAPI';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [allNotifications,setAllNotifications] = useState([]);
  const [notificationCount,setNotificationCount] = useState(0);
  const {callAuthAPI} = useCallAPI();

  const addTask = async (todo) => {
    try {
      const response = await callAuthAPI({url:'/tasks/create', 
        method: 'POST',
        data:todo,
      });
      console.log(response.data.task);
      setTaskList([...taskList,response.data.task]);
    } catch (error) {
      alert('Something went wrong');
    }
  };
  
  const deleteTask = async (id) => {
    try {
      await callAuthAPI({url:`/tasks/${id}`, method: 'DELETE'});
      setTaskList((prevTasks)=>prevTasks.filter(task=>task._id !== id));
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  const updateTask = async (id,updatedTodo) => {
    const response = await callAuthAPI({url:`/tasks/${id}`, method: 'PATCH', data: updatedTodo});
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task._id === id ? response?.data?.task : task))
    );
  };
  
  
  useEffect(()=>{
    setNotificationCount(allNotifications.reduce((acc,notification)=>!notification?.isRead ?  acc + 1 : acc,0));
  },[allNotifications])

  return (
    <TaskContext.Provider value={{addTask, updateTask,taskList, setTaskList,deleteTask,allNotifications,setAllNotifications,notificationCount }}>
      {children}
    </TaskContext.Provider>
  );
};
