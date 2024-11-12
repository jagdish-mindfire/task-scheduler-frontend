'ues client';
import React from 'react';
import { PlusCircle, Menu, Bell, Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { userLogout } from '@/app/services/loginApiService';
import { Button } from '@/app/components/Common/Button';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../Common/DropdownMenu.js';
import StringDP from '../Common/StringDP';
import CONSTANT_STRING from '../../constants/strings';

export default function Header({ toggleNavbar }) {
  const router = useRouter();

  const logout = () => {
    try {
      userLogout();
      
    } catch (error) {
      console.log(error);
    }finally{
      router.push('/login');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 bg-black border-b border-gray-700">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleNavbar}
            className="text-white hover:bg-gray-800"
          >
            <Menu className="h-5 w-5 text-white" />
          </Button>
          {/* <Button variant="default" size="sm" className="bg-gray-700 text-white hover:bg-gray-600"> */}
          {/* <PlusCircle className="mr-2 h-4 w-4" /> */}
          {/* <span className="hidden sm:inline">Create</span> */}
          {/* </Button> */}
        </div>
        {/* <div className="flex-grow max-w-xs sm:max-w-xl mx-2 md:mx-4">
          <Input type="text" placeholder="Search tasks..." className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
        </div> */}
        <div className="flex-grow max-w-xs sm:max-w-xl mx-2 md:mx-4 text-center font-bold text-white ">
          {CONSTANT_STRING.APP_TITLE}
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-8 w-8 rounded-full"
              >
                <StringDP />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 text-white">
              <DropdownMenuLabel>
                {CONSTANT_STRING.MY_ACCOUNT}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-700">
                {CONSTANT_STRING.PROFILE}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700">
                {CONSTANT_STRING.SETTINGS}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700" onClick={logout}>
                {CONSTANT_STRING.LOGOUT}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
