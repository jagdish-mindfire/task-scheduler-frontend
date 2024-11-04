import React from "react";
import {
  Home,
  Calendar,
  MessageSquare,
  CheckCircle,
  PlusCircle,
  Settings,
  HelpCircle,
  LayoutGrid
} from "lucide-react";

import ScrollArea from "../Common/ScrollArea.jsx";
import { Link } from "react-router-dom";
import StringDP from "../Common/StringDP.jsx";

const LeftNavbar = ({ isOpen }) => {
  return (
    <div
      className={`h-screen bg-black flex flex-col border-r border-gray-700 transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="p-4">
        <button className="w-full flex items-center justify-start text-white border border-gray-700 hover:bg-gray-800 p-2">
          <StringDP /> Your's Workspace
        </button>
      </div>
      {/* <div className="px-4 mb-4">
        <Input type="text" placeholder="Search" className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
      </div> */}
      <ScrollArea className="flex-grow mt-10">
        <nav className="space-y-2 px-2">
          <Link
            to="/home"
            className="flex items-center w-full justify-start text-white hover:bg-gray-800 p-2"
          >
            <Home className="mr-2 h-4 w-4" /> Home
          </Link>
          <Link
            to="/tasks"
            className="flex items-center w-full justify-start text-white hover:bg-gray-800 p-2"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> My Tasks
          </Link>
          <Link
            to="/tasks/board"
            className="flex items-center w-full justify-start text-white hover:bg-gray-800 p-2"
          >
            <LayoutGrid className="mr-2 h-4 w-4" /> Board
          </Link>
          <Link
            to="/tasks/calendar"
            className="flex items-center w-full justify-start text-white hover:bg-gray-800 p-2"
          >
            <Calendar className="mr-2 h-4 w-4" /> Calendar
          </Link>
        </nav>
        <div className="mt-6 px-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-400">Projects</h3>
          <nav className="space-y-1">
            {/* <button className="w-full justify-start text-sm text-white hover:bg-gray-800">
              Marketing Campaign
            </button> */}
          </nav>
        </div>
        <div className="mt-4 px-4">
          <button className="w-full flex items-center justify-start text-sm text-white hover:bg-gray-800 p-2">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Project
          </button>
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t border-gray-700">
        <nav className="flex justify-between">
          <button className="text-white hover:bg-gray-800 p-2">
            <Settings className="h-5 w-5" />
          </button>
          <button className="text-white hover:bg-gray-800 p-2">
            <HelpCircle className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default LeftNavbar;