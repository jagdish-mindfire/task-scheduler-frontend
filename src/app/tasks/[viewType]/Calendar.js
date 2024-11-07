"use client"

import React, { useState, useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { TaskContext } from '../../context/TaskContext';
import useTask from '../../hooks/useTask';
import { useRouter } from 'next/navigation';

export default function Calendar() {
  const { getAllTasks } = useTask();
  const { taskList } = useContext(TaskContext);
  
  const router = useRouter();

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);
  
  const handleEventClick = (clickInfo) => {
    const taskId = clickInfo.event._def.extendedProps._id;
    console.log(taskId);
    // Navigate to task details page
    router.push(`/tasks/calendar/${taskId}`);
    // navigate(`/tasks/calendar/${taskId}`);
  };
  
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      height="400px"
      contentHeight="350px"
      events={[
        ...Object.values(taskList).flat().filter(task => task.dueDate).map(task => ({
          title: task.title,
          date: task.dueDate,
          _id: task._id
        })),
      ]}
      eventClick={handleEventClick} 
    />
  );
}