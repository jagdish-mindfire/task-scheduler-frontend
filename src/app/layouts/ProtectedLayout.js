"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

import { TaskProvider } from "../context/TaskContext";
import { UserProvider } from "../context/UserContext";
import LeftNavbar from "@/app/components/layout/LeftNavbar";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";

export default function ProtectedLayout({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const queryClient = new QueryClient();

  // useEffect to determine if the device is mobile
  //   useEffect(() => {
  //     const handleResize = () => {
  //       if (window.innerWidth <= 768) {
  //         setIsNavbarOpen(false); // Set to false for mobile devices
  //       } else {
  //         setIsNavbarOpen(true); // Set to true for larger screens
  //       }
  //     };

  //     // Set the initial state based on window size
  //     handleResize();

  //     // Add event listener to update state when resizing the window
  //     window.addEventListener("resize", handleResize);

  //     // Clean up the event listener on component unmount
  //     return () => window.removeEventListener("resize", handleResize);
  //   }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <UserProvider>
          <ToastContainer />
          <div className="flex h-screen bg-gray-100">
            <LeftNavbar isOpen={isNavbarOpen} />
            <div className="flex flex-col flex-grow">
              <Header toggleNavbar={toggleNavbar} />
              <main className="flex-grow overflow-auto p-6 bg-white">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </UserProvider>
      </TaskProvider>
    </QueryClientProvider>
  );
}
