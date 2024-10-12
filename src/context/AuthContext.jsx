import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [refreshToken,setRefreshToken] = useState(null);
  const [accessToken,setAccessToken] = useState(null);


  return (
    <AuthContext.Provider value={{accessToken,setAccessToken,refreshToken,setRefreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};
