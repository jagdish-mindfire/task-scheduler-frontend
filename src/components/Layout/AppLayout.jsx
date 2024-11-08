import React, { useState, useEffect } from 'react'
import LeftNavbar from './LeftNavbar'
import Footer from './Footer'
import Header from './Header'

export default function AppLayout({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsNavbarOpen(false)
      } else {
        setIsNavbarOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftNavbar isOpen={isNavbarOpen} />
      <div className="flex flex-col flex-grow">
        <Header toggleNavbar={toggleNavbar} />
        <main className="flex-grow overflow-auto p-6 bg-white">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
