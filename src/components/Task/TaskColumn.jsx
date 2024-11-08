import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'
export default function TaskColumn({ title, tasks, id }) {
  return (
    <div className="bg-gray-100 p-2 rounded-lg w-1/3">
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[150px]"
          >
            {tasks?.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
