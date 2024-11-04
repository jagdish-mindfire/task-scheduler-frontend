import React,{useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import TaskColumn from './TaskColumn';
import TaskCard from './TaskCard';
export default function Board() {
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
      })

      const onDragEnd = (result) => {
        const { source, destination } = result
        if (!destination) return
    
        const sourceColumn = source.droppableId
        const destColumn = destination.droppableId
    
        const sourceTasks = Array.from(tasks[sourceColumn])
        const destTasks = sourceColumn === destColumn ? sourceTasks : Array.from(tasks[destColumn])
        const [reorderedItem] = sourceTasks.splice(source.index, 1)
        destTasks.splice(destination.index, 0, reorderedItem)
    
        setTasks(prev => ({
          ...prev,
          [sourceColumn]: sourceTasks,
          ...(sourceColumn !== destColumn && { [destColumn]: destTasks }),
        }))
      }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-2">
        <TaskColumn title="Recently Assigned" tasks={tasks.recentlyAssigned} id="recentlyAssigned" />
        <TaskColumn title="Do Today" tasks={tasks.doToday} id="doToday" />
        <TaskColumn title="Do Later" tasks={tasks.doLater} id="doLater" />
      </div>
    </DragDropContext>
  )
}
