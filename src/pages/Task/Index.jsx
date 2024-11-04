import React, { useState, useEffect } from 'react'
import { twMerge } from "tailwind-merge"
import {
  ChevronDown,
  List,
  LayoutGrid,
  Calendar as CalendarIcon,
  Plus,
  Share,
  Sliders,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Calendar from '../../components/Task/Calendar'
import Board from '../../components/Task/Board'
import StringDP from '../../components/Common/StringDP'
import { Button } from '../../components/Common/Button'
import TaskList from '../../components/Task/TaskList'
import useTask from "../../hooks/useTask"

export default function Index() {
  const [activeTab, setActiveTab] = useState('list')
  const { getAllTasks } = useTask()
  const { viewType } = useParams();
  const navigate = useNavigate();

  const cn = (...inputs) => twMerge(inputs);

  useEffect(() => {
    getAllTasks()
  }, [])

  useEffect(() => {
    setActiveTab(viewType !== undefined ? viewType.toLowerCase() : "list");
  }, [viewType]);

  const renderTaskContent = () => {
    switch (activeTab) {
      case 'list':
        return <TaskList />
      case 'board':
        return <Board />
      case 'calendar':
        return <Calendar />
      default:
          navigate("/not-found");
          return;
    }
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 max-w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <StringDP />
          <h1 className="text-lg sm:text-xl font-semibold">My tasks</h1>
          <ChevronDown className="w-4 h-4 ml-auto sm:ml-0" />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Share className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Share</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Sliders className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Customize</span>
          </Button>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="flex items-center space-x-1 mb-4 border-b overflow-x-auto">
        <Link to={'/tasks/list'}>
          <Button
            variant="ghost"
            className={cn("border-b-2 flex items-center whitespace-nowrap px-2 sm:px-4", 
              activeTab === 'list' ? "border-x-4 border-blue-500 text-blue-700" : "border-transparent")}
          >
            <List className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">List</span>
          </Button>
        </Link>
        <Link to={'/tasks/board'}>
          <Button
            variant="ghost"
            className={cn("border-b-2 flex items-center whitespace-nowrap px-2 sm:px-4", 
              activeTab === 'board' ? "border-x-4 border-blue-500 text-blue-700" : "border-transparent")}
          >
            <LayoutGrid className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Board</span>
          </Button>
        </Link>
        <Link to={'/tasks/calendar'}>
          <Button
            variant="ghost"
            className={cn("border-b-2 flex items-center whitespace-nowrap px-2 sm:px-4", 
              activeTab === 'calendar' ? "border-x-4 border-blue-500 text-blue-700" : "border-transparent")}
          >
            <CalendarIcon className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Calendar</span>
          </Button>
        </Link>
        <Button variant="ghost" className="flex items-center px-2 sm:px-4">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Task Content Section */}
      <div className="bg-background shadow rounded-lg overflow-hidden p-2 sm:p-4">
        {renderTaskContent()}
      </div>
    </div>
  )
}