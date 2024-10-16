import React, { createContext, useEffect, useState } from 'react';
export const TaskModelStates = createContext();

export const TaskModelStatesProvider = ({ children }) => {

  const [taskData,setTaskData] = useState({});

  const [modelStates,setModelStates] = useState({
    showViewTask:false,
    showAddTask:false,
    showEditTask:false,
    showDeleteConfirmation:false,
  });
  
  const updateModelStates = (props) => {
    const validUpdates = {};

    //Ensuring Valid keys are only updated.
    Object.entries(props).forEach(([key, value]) => {
      if (key in modelStates) {
        validUpdates[key] = value;
      }
    });
  
    if (Object.keys(validUpdates).length > 0) {
      setModelStates((prevState) => ({
        ...prevState,
        ...validUpdates,
      }));
    }
  };
  



  return (
    <TaskModelStates.Provider value={{modelStates,updateModelStates,taskData,setTaskData}}>
      {children}
    </TaskModelStates.Provider>
  );
};
