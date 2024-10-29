import React, { useState } from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva } from "class-variance-authority"
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

const cn = (...inputs) => twMerge(inputs)
import {Button} from "./Button";
import { Avatar,AvatarFallback,AvatarImage } from "./Avatar";
import Input from "./Input"
import ScrollArea from "./ScrollArea"

import { Link } from "react-router-dom"
import { StringDP } from "../../mockAPIs.jsx"



const LeftNavbar = ({ isOpen }) => (
    <div className={`h-screen bg-black flex flex-col border-r border-gray-700 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start text-white border-gray-700 hover:bg-gray-800">
            <StringDP/>
          Your's Workspace
        </Button>
      </div>
      <div className="px-4 mb-4">
        <Input type="text" placeholder="Search" className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
      </div>
      <ScrollArea className="flex-grow">
        <nav className="space-y-2 px-2">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Home className="mr-2 h-4 w-4" />
         <Link to="/home">
            Home
         </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <CheckCircle className="mr-2 h-4 w-4" />
           <Link to="/tasks">
            My Tasks
           </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </nav>
        <div className="mt-6 px-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-400">Projects</h3>
          <nav className="space-y-1">
            {/* <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-gray-800">
              Marketing Campaign
            </Button> */}
          </nav>
        </div>
        <div className="mt-4 px-4">
          <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-gray-800">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t border-gray-700">
        <nav className="flex justify-between">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </div>
  )

export default LeftNavbar;