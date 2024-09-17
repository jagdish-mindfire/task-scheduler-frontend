import React, { createContext, useState } from 'react';
import useCallAPI from '../hooks/useCallAPI';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const {callAuthAPI} = useCallAPI();

  const addTask = async (todo) => {
    try {
      
      const response = await callAuthAPI({url:'/task/create', 
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
      await callAuthAPI({url:`/task/${id}`, method: 'DELETE'});
      setTaskList((prevTasks)=>prevTasks.filter(task=>task._id !== id));
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  const updateTask = async (id,updatedTodo) => {
    console.log(updatedTodo);
    const response = await callAuthAPI({url:`/task/${id}`, method: 'PATCH', data: updatedTodo});
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task._id === id ? response?.data?.task : task))
    );
  };

  return (
    <TaskContext.Provider value={{addTask, updateTask,taskList, setTaskList,deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
