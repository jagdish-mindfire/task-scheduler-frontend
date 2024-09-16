import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Login from './components/Login.jsx';
// import Signup from './components/Signup.jsx';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:  <Login />,
//   },
//   {
//     path: "/login",
//     element:  <Login />,
//   },
//   {
//     path: "/signup",
//     element:  <Signup />,
//   },
// ]);




import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext.jsx';
import { TodoProvider } from './context/TodoContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <TodoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TodoProvider>
      </AuthProvider>
  </StrictMode>,
)