import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,redirect
} from "react-router-dom";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';


const checkIfLoggedIn = async () => {
  const currentRefreshToken =  localStorage.getItem('refresh_token');
  const apiUrl =import.meta.env.VITE_API_URL;

  let token = null;
  try {
      let { data } = await axios.post(apiUrl + '/auth/token', {refresh_token:currentRefreshToken});
      token = data.access_token;
      return true;
  } catch (error) {
      return false;
  }

};


const router = createBrowserRouter([
  {
    path: "/",
    loader : async () => {
      const isLoggedIn = await checkIfLoggedIn();
      if(isLoggedIn){
       throw redirect("/dashboard");
      }else{
        throw redirect("/login");
      }
      return null;
    },
    element:  <Login />,
    
  },
  {
    path: "/login",
    loader : async () => {
      const isLoggedIn = await checkIfLoggedIn();
      if(isLoggedIn){
       throw redirect("/dashboard");
      }
      return null;
    },
    element:  <Login />,
  },
  {
    path: "/signup",
    loader : async () => {
      const isLoggedIn = await checkIfLoggedIn();
      if(isLoggedIn){
       throw redirect("/dashboard");
      }
      return null;
    },
    element:  <Signup />,
  },
  {
    path: "/dashboard",
    loader : async () => {
     const isLoggedIn = await checkIfLoggedIn();
     if(!isLoggedIn){
      throw redirect("/login");
     }
     return null;
    },
    element: <><Header/><Dashboard /><Footer/></> ,
  },
]);




import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <TaskProvider>
        <RouterProvider router={router} />
        <Toaster   position="bottom-right"       toastOptions={{
    // Define default options
    className: '',
    duration: 20000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}

     />
        </TaskProvider>
      </AuthProvider>
  </StrictMode>,
);