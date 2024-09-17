import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/login';
import Dashboard from './components/Dashboard';

import { AuthContext } from './context/AuthContext';


const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
