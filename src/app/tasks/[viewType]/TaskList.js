'use client';

import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link.js';
import {
  MoreHorizontal,
  CheckCircle2,
  Circle,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  Filter,
  ArrowUpDown,
  Group,
} from 'lucide-react';

import { Button } from '../../components/Common/Button';
import useTask from '../../hooks/useTask';
import { TaskContext } from '../../context/TaskContext';
import DueDateInput from '../../components/Common/DueDateInput';

export default function TaskList() {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const editInputRef = useRef(null);

  const { taskList, setTask, task } = useContext(TaskContext);
  const { sortTasks, updateTask, addTask } = useTask();
  const updatingRef = useRef(false);

  useEffect(() => {
    if ((editingTaskId !== null || isAddingNewTask) && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTaskId, isAddingNewTask]);

  const toggleTaskCompletion = async (task) => {
    if (!updatingRef.current) {
      updatingRef.current = true;
      let updateCompleteStatus = task.isCompleted ? 0 : 1;
      await updateTask(task._id, { is_completed: updateCompleteStatus });
      updatingRef.current = false;
    }
  };

  const openTaskDetails = (taskDetails) => {
    setTask(taskDetails);
  };

  const startEditingTitle = (taskId, currentTitle) => {
    setEditingTaskId(taskId);
    setEditingTitle(currentTitle);
  };

  const handleTitleEdit = (taskId) => {
    if (editingTitle.trim() !== '') {
      if (taskId === 'new') {
        addTask({ title: editingTitle, dueDate: selectedDueDate });
      } else {
        updateTask(taskId, { title: editingTitle });
      }
    }
    setEditingTaskId(null);
    setIsAddingNewTask(false);
    setEditingTitle('');
    setSelectedDueDate(null);
  };

  const handleAddTask = () => {
    setIsAddingNewTask(true);
    setEditingTaskId('new');
    setEditingTitle('');
    setSelectedDueDate(null);
  };

  const handleInputBlur = () => {
    if (editingTaskId === 'new') {
      handleTitleEdit('new');
    } else if (editingTaskId) {
      handleTitleEdit(editingTaskId);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="default"
          size="sm"
          className="bg-slate-600 text-white border-2 border-slate-800 hover:bg-black hover:border-black p-5"
          onClick={handleAddTask}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add task
        </Button>
        <div className="flex space-x-1">
          {/* <Button variant="outline" size="sm">
            <Filter className="w-3 h-3 mr-1" />
            Filter
          </Button> */}
          <Button variant="outline" size="sm" onClick={sortTasks}>
            <ArrowUpDown className="w-3 h-3 mr-1" />
            Sort
          </Button>
          {/* <Button variant="outline" size="sm">
            <Group className="w-3 h-3 mr-1" />
            Group
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-3 h-3" />
            Options
          </Button> */}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                Task name
              </th>
              <th
                className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-1/4"
                onClick={sortTasks}
              >
                Due date
                {sortOrder === 'asc' ? (
                  <ChevronUp className="inline-block w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="inline-block w-4 h-4 ml-1" />
                )}
              </th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                Project
              </th>
              {/* <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                Priority
              </th> */}
            </tr>
          </thead>
          <tbody>
            {isAddingNewTask && (
              <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-2 whitespace-nowrap hover:border hover:border-black">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mr-1 border-green-700"
                    >
                      <Circle className="w-4 h-4 text-gray-300" />
                    </Button>
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleTitleEdit('new');
                        }
                      }}
                      className="bg-transparent focus:outline-none text-xs w-full"
                      placeholder="Enter new task title"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 hover:border hover:border-black">
                  <DueDateInput
                    selectedDueDate={selectedDueDate}
                    setSelectedDueDate={setSelectedDueDate}
                    task={{ _id: 'new' }}
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs">
                  {/* Project field for new task */}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs">
                  {/* Priority field for new task */}
                </td>
              </tr>
            )}
            {taskList.map((task) => (
              <tr
                key={task._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150 "
              >
                <td className="hover:border hover:border-black px-4 py-2 whitespace-nowrap ">
                  <div className="flex items-center ">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTaskCompletion(task)}
                      className="mr-1  border-green-700"
                    >
                      {task.isCompleted ? (
                        <CheckCircle2 className="w-6 h-4 text-green-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300" />
                      )}
                    </Button>
                    {editingTaskId === task._id ? (
                      <input
                        ref={editInputRef}
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={handleInputBlur}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleTitleEdit(task._id);
                          }
                        }}
                        className="bg-transparent focus:outline-none text-xs w-full"
                      />
                    ) : (
                      <span
                        className={`cursor-pointer text-xs ${
                          task.isCompleted ? 'text-gray-500' : 'font-bold'
                        }`}
                        onClick={() => startEditingTitle(task._id, task.title)}
                      >
                        {task.title}
                      </span>
                    )}
                    <Link href={`/tasks/list/${task._id}`}>
                      <Button
                        className="ml-auto hover:bg-slate-300"
                        variant="ghost"
                        size="sm"
                        // onClick={() => openTaskDetails(task)}
                      >
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 hover:border hover:border-black">
                  <DueDateInput
                    selectedDueDate={task.dueDate}
                    setSelectedDueDate={(date) =>
                      updateTask(task._id, { dueDate: date })
                    }
                    task={task}
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs">
                  {task.project && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-800">
                      {task.project}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs">
                  {/* Add priority content here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {isAddingNewTask && (
          <div className="border-t border-gray-200 p-4 mb-4">
            <div className="flex items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                className="mr-1 border-green-700"
              >
                <Circle className="w-4 h-4 text-gray-300" />
              </Button>
              <input
                ref={editInputRef}
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onBlur={handleInputBlur}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleTitleEdit('new');
                  }
                }}
                className="bg-transparent focus:outline-none text-sm w-full"
                placeholder="Enter new task title"
              />
            </div>
            <DueDateInput
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
              task={{ _id: 'new' }}
            />
          </div>
        )}
        {taskList.map((task) => (
          <div key={task._id} className="border-t border-gray-200 p-4 mb-4">
            <div className="flex items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleTaskCompletion(task)}
                className="mr-1 border-green-700"
              >
                {task.isCompleted ? (
                  <CheckCircle2 className="w-6 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
              </Button>
              {editingTaskId === task._id ? (
                <input
                  ref={editInputRef}
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={handleInputBlur}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleTitleEdit(task._id);
                    }
                  }}
                  className="bg-transparent focus:outline-none text-sm w-full"
                />
              ) : (
                <span
                  className={`cursor-pointer text-sm ${
                    task.isCompleted ? 'text-gray-500' : 'font-bold'
                  }`}
                  onClick={() => startEditingTitle(task._id, task.title)}
                >
                  {task.title}
                </span>
              )}
              <Button
                className="ml-auto hover:bg-slate-300"
                variant="ghost"
                size="sm"
                onClick={() => openTaskDetails(task)}
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 mb-1">
              <DueDateInput
                selectedDueDate={task.dueDate}
                setSelectedDueDate={(date) =>
                  updateTask(task._id, { dueDate: date })
                }
                task={task}
              />
            </div>
            {task.project && (
              <div className="text-xs font-semibold bg-green-100 text-green-800 inline-block px-2">
                {task.project}
              </div>
            )}
          </div>
        ))}
      </div>
      {taskList?.length === 0 && (
        <p className="text-center p-5">
          Schedule Your first task by clicking on Add task
        </p>
      )}
    </div>
  );
}
