import React, { useState, useRef, useEffect,useContext } from 'react'
import { twMerge } from "tailwind-merge"
import {
  ChevronDown,
  List,
  LayoutGrid,
  Calendar as CalendarIcon,
  Plus,
  Filter,
  ArrowUpDown,
  Group,
  MoreHorizontal,
  Share,
  Sliders,
} from 'lucide-react'
import Calendar from './Calendar'
import Board from './Board'
import { StringDP } from '../../mockAPIs'
import { Button } from '../../components/Common/Button'
import TaskList from './TaskList';
import useTask from "../../hooks/useTask.js";

const cn = (...inputs) => twMerge(inputs)







const TaskPage = () => {
  const [activeTab, setActiveTab] = useState('list')
  const [tasks, setTasks] = useState({
    list: [
      { id: 1, title: 'this is the new task', completed: true, dueDate: '2023-10-01', project: 'Cross-func...', visibility: 'My workspace' },
      { id: 2, title: 'Draft project brief', completed: true, dueDate: '2023-10-24', project: 'Cross-func...', visibility: 'My workspace' },
      { id: 3, title: 'this is another task', completed: false, dueDate: '', project: '', visibility: 'Only me' },
      { id: 4, title: 'this is new task', completed: false, dueDate: '', project: '', visibility: 'Only me' },
    ],
    recentlyAssigned: [
      { id: 'task-1', title: 'Review project proposal', completed: false, dueDate: '2023-10-15' },
      { id: 'task-2', title: 'Update team meeting agenda', completed: true, dueDate: '2023-10-16' },
    ],
    doToday: [
      { id: 'task-3', title: 'Prepare presentation slides', completed: false, dueDate: '2023-10-17' },
      { id: 'task-4', title: 'Send follow-up emails', completed: false, dueDate: '2023-10-17' },
    ],
    doLater: [
      { id: 'task-5', title: 'Research new marketing strategies', completed: false, dueDate: '2023-10-25' },
      { id: 'task-6', title: 'Plan team building activity', completed: false, dueDate: '2023-10-30' },
    ],
  });
  const { getAllTasks } = useTask();

  useEffect(() => {
    getAllTasks();
  }, []);


  const renderTaskContent = () => {
    switch (activeTab) {
      case 'list':
        return (<TaskList/>
        )
      case 'board':
        return (
          <Board/>
        )
      case 'calendar':
        return (
          <Calendar/>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-2 py-4 max-w-5xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <StringDP/>
          <h1 className="text-xl font-semibold mr-1">My tasks</h1>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex space-x-1">
          <Button variant="outline" size="sm">
            <Share className="w-3 h-3 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Sliders className="w-3 h-3 mr-1" />
            Customize
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-4 border-b">
        <Button
          variant="ghost"
          className={cn("border-b-2", activeTab === 'list' ? "border-blue-500 text-blue-500" : "border-transparent")}
          onClick={() => setActiveTab('list')}
        >
          <List className="w-3 h-3 mr-1" />
          List
        </Button>
        <Button
          variant="ghost"
          className={cn("border-b-2", activeTab === 'board' ? "border-blue-500 text-blue-500" : "border-transparent")}
          onClick={() => setActiveTab('board')}
        >
          <LayoutGrid className="w-3 h-3 mr-1" />
          Board
        </Button>
        <Button
          variant="ghost"
          className={cn("border-b-2", activeTab === 'calendar' ? "border-blue-500 text-blue-500" : "border-transparent")}
          onClick={() => setActiveTab('calendar')}
        >
          <CalendarIcon className="w-3 h-3 mr-1" />
          Calendar
        </Button>
        <Button variant="ghost">
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      

      <div className="bg-white shadow rounded-lg overflow-hidden p-4">
        {renderTaskContent()}
      </div>
    </div>
  )
}

export default TaskPage
