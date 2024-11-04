import React, { useState, useEffect } from 'react';
import { twMerge } from "tailwind-merge";
import {
  ChevronDown,
  List,
  LayoutGrid,
  Calendar as CalendarIcon,
  Plus,
  Share,
  Sliders,
} from 'lucide-react';
import Calendar from '../../components/Task/Calendar.jsx';
import Board from '../../components/Task/Board.jsx';
import StringDP from '../../components/Common/StringDP.jsx';
import { Button } from '../../components/Common/Button.jsx';
import TaskList from '../../components/Task/TaskList.jsx';
import useTask from "../../hooks/useTask.js";

const cn = (...inputs) => twMerge(inputs);

const Index = () => {
  const [activeTab, setActiveTab] = useState('list');
  const { getAllTasks } = useTask();

  useEffect(() => {
    getAllTasks();
  }, []);

  const renderTaskContent = () => {
    switch (activeTab) {
      case 'list':
        return <TaskList />;
      case 'board':
        return <Board />;
      case 'calendar':
        return <Calendar />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-full md:max-w-5xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <StringDP />
          <h1 className="text-lg md:text-xl font-semibold">My tasks</h1>
          <ChevronDown className="w-4 h-4 hidden md:block" />
        </div>
        <div className="flex flex-wrap space-x-2">
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="outline" size="sm">
            <Sliders className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Customize</span>
          </Button>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="flex items-center space-x-1 mb-4 border-b overflow-x-auto">
        <Button
          variant="ghost"
          className={cn("border-b-2 flex items-center whitespace-nowrap", activeTab === 'list' ? "border-blue-500 text-blue-500" : "border-transparent")}
          onClick={() => setActiveTab('list')}
        >
          <List className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">List</span>
        </Button>
        <Button
          variant="ghost"
          className={cn("border-b-2 flex items-center whitespace-nowrap", activeTab === 'board' ? "border-blue-500 text-blue-500" : "border-transparent")}
          onClick={() => setActiveTab('board')}
        >
          <LayoutGrid className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Board</span>
        </Button>
        <Button
          variant="ghost"
          className={cn("border-b-2 flex items-center whitespace-nowrap", activeTab === 'calendar' ? "border-blue-500 text-blue-500" : "border-transparent")}
          onClick={() => setActiveTab('calendar')}
        >
          <CalendarIcon className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Calendar</span>
        </Button>
        <Button variant="ghost" className="flex items-center">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Task Content Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden p-4">
        {renderTaskContent()}
      </div>
    </div>
  );
};

export default Index;
