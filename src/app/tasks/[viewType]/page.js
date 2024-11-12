'use client';
import { notFound } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ChevronDown,
  List,
  LayoutGrid,
  Calendar as CalendarIcon,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import TaskList from './TaskList';
import Calendar from './Calendar';
import Board from './Board';
import StringDP from '../../components/Common/StringDP';
import { Button } from '../../components/Common/Button';
import useTask from '../../hooks/useTask';
import CONSTANT_STRINGS from '../../constants/strings';

export default function Index() {
  const [activeTab, setActiveTab] = useState('list');
  const { getAllTasks } = useTask();
  const { viewType } = useParams();

  const cn = (...inputs) => twMerge(inputs);

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]); // Ensure getAllTasks only runs once on mount

  useEffect(() => {
    setActiveTab(viewType ? viewType.toLowerCase() : 'list');
  }, [viewType]); // add viewType to dependency array to avoid re-renders

  const renderTaskContent = () => {
    switch (activeTab) {
      case 'list':
        return <TaskList />;
      case 'board':
        return <Board />;
      case 'calendar':
        return <Calendar />;
      default:
        notFound();
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 max-w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <StringDP />
          <h1 className="text-lg sm:text-xl font-semibold">
            {CONSTANT_STRINGS.MY_TASKS}
          </h1>
          <ChevronDown className="w-4 h-4 ml-auto sm:ml-0" />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex items-center space-x-1 mb-4 border-b overflow-x-auto">
        <Link href={'/tasks/list'}>
          <Button
            variant="ghost"
            className={cn(
              'border-b-2 flex items-center whitespace-nowrap px-2 sm:px-4',
              activeTab === 'list'
                ? 'border-2 border-black'
                : 'border-transparent'
            )}
          >
            <List className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">{CONSTANT_STRINGS.LIST}</span>
          </Button>
        </Link>
        <Link href={'/tasks/board'}>
          <Button
            variant="ghost"
            className={cn(
              'border-b-2 flex items-center whitespace-nowrap px-2 sm:px-4',
              activeTab === 'board'
                ? 'border-2 border-black'
                : 'border-transparent'
            )}
          >
            <LayoutGrid className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">{CONSTANT_STRINGS.BOARD}</span>
          </Button>
        </Link>
        <Link href={'/tasks/calendar'}>
          <Button
            variant="ghost"
            className={cn(
              'border-b-2 flex items-center whitespace-nowrap px-2 sm:px-4',
              activeTab === 'calendar'
                ? 'border-2 border-black'
                : 'border-transparent'
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">
              {CONSTANT_STRINGS.CALENDAR}
            </span>
          </Button>
        </Link>
        <Button variant="ghost" className="flex items-center px-2 sm:px-4">
          {/* <Plus className="w-4 h-4" /> */}
        </Button>
      </div>

      {/* Task Content Section */}
      <div className="bg-background shadow rounded-lg overflow-hidden p-2 sm:p-4">
        {renderTaskContent()}
      </div>
    </div>
  );
}
