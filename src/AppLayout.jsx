import React, { useState } from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { twMerge } from "tailwind-merge"
import {
  Home,
  Search,
  Calendar,
  MessageSquare,
  CheckCircle,
  PlusCircle,
  ChevronDown,
  Settings,
  HelpCircle,
  Menu,
  Bell,
} from "lucide-react"

import LeftNavbar from "./components/Common/LeftNavbar";
import { buttonVariants } from "./utils/buttonVariants"
import {Button} from "./components/Common/Button"
import Input from "./components/Common/Input"
import {Avatar,AvatarImage,AvatarFallback} from "./components/Common/Avatar";
import {DropdownMenuTrigger, DropdownMenu ,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator } from "./components/Common/DropdownMenu"

import {apis,getFirstLetters, StringDP} from './mockAPIs';
const cn = (...inputs) => twMerge(inputs)




const Header = ({ toggleNavbar }) => (
  <header className="flex items-center justify-between px-4 py-2 bg-black border-b border-gray-700">
    <div className="flex items-center">
      <Button variant="ghost" size="sm" onClick={toggleNavbar} className="text-white hover:bg-gray-800">
        <Menu className="h-5 w-5" />
      </Button>
      <Button variant="default" size="sm" className="ml-4 bg-gray-700 text-white hover:bg-gray-600">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create
      </Button>
    </div>
    <div className="flex-grow max-w-xl mx-4">
      <Input type="text" placeholder="Search tasks..." className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
    </div>
    <div className="flex items-center">
      <Button variant="ghost" size="sm" className="mr-2 text-white hover:bg-gray-800">
        <Bell className="h-5 w-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
              <StringDP/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 text-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="hover:bg-gray-700">Profile</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-700">Settings</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-700">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
)

const Footer = () => (
  <footer className="py-4 px-6 bg-black border-t border-gray-700">
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-400">© 2024 Schecule Me. All rights reserved.</p>
      <nav className="space-x-4">
        <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
      </nav>
    </div>
  </footer>
)



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