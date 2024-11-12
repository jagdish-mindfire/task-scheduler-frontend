'use client';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation'; // Updated import
import { CheckCircle2, Circle, Calendar as CalendarIcon } from 'lucide-react';
import moment from 'moment';

export default function TaskCard({ task, index }) {
  const router = useRouter();

  return (
    <Draggable draggableId={task?._id?.toString()} index={index}>
      {(provided) => (
        <div
          onClick={() => router.push(`/tasks/board/${task._id}`)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-2 mb-1 rounded-lg shadow"
        >
          <div className="flex items-center">
            {task.isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <Circle className="w-4 h-4 text-gray-300 mr-1" />
            )}
            <span
              className={
                task.completed
                  ? 'line-through text-gray-500 text-sm'
                  : 'text-sm'
              }
            >
              {task.title}
            </span>
          </div>
          {task.dueDate && (
            <div className="text-xs text-gray-500 mt-1">
              <CalendarIcon className="w-3 h-3 inline-block mr-1" />
              {moment(task.dueDate).format('LL')}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
