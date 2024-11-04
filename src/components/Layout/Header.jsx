
import React from "react"
import {
  PlusCircle,
  Menu,
  Bell,
} from "lucide-react"
import { userLogout } from "../../api/apiLogin"
import { useNavigate } from "react-router-dom";

import {Button} from "../Common/Button"
import Input from "../Common/Input"
import {DropdownMenuTrigger, DropdownMenu ,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator } from "../Common/DropdownMenu"
import StringDP from '../Common/StringDP';


const Header = ({ toggleNavbar }) => {  
  const navigate = useNavigate();

  const logout = () => {
    userLogout();
    navigate("/login");
  }
  return (<>
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
          <DropdownMenuItem className="hover:bg-gray-700" onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
  </>);
}

export default Header;