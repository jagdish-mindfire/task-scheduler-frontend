import React, { createContext, useEffect, useState } from 'react';
import { Avatar,AvatarFallback,AvatarImage } from "../components/Common/Avatar";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData,setUserData]= useState({});

  return (
    <UserContext.Provider value={{userData,setUserData}}>
      {children}
    </UserContext.Provider>
  );
};