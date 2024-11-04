import React, { useState } from "react"
import LeftNavbar from "./LeftNavbar";
import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true)

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen)
  }

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
  )
}