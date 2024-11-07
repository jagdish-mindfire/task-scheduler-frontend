"use client"
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Box from '@mui/material/Box';
import {
  MoreHorizontal,
  CheckCircle2,
  Circle,
  Lock,
  ChevronRight,
  Calendar as CalendarIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import useTask from '../../hooks/useTask';

export default function CustomDatePicker({ task }) {
  const [open, setOpen] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const calendarRef = useRef(null);

  const { updateTask } = useTask();
  const handleIconClick = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <Box display="flex" alignItems="center"> 
      <span onClick={handleIconClick}>
        {task?.dueDate ? (
          <span className='text-xs'>{moment(task.dueDate).format('ll')}</span>
        ) : (
          <CalendarIcon className="w-4 h-4 text-gray-300" />
        )}
      </span>

      {open && (
        <Box position="absolute" zIndex={1500} ref={calendarRef} className="hover:border hover:border-black">
          <DatePicker
            stu
            selected={selectedDueDate || (task?.dueDate ? new Date(task.dueDate) : null)}
            onChange={(newValue) => {
              updateTask(task._id,{due_date : moment(newValue).format("YYYY-MM-DD")});
              setSelectedDueDate(newValue);
              setOpen(false);
            }}
            inline
          />
        </Box>
      )}
    </Box>
  );
}