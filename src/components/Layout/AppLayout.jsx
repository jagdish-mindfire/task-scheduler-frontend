import React, { useState, useEffect } from "react";
import LeftNavbar from "./LeftNavbar";
import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // useEffect to determine if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsNavbarOpen(false); // Set to false for mobile devices
      } else {
        setIsNavbarOpen(true); // Set to true for larger screens
      }
    };

    // Set the initial state based on window size
    handleResize();

    // Add event listener to update state when resizing the window
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
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
  );
}
