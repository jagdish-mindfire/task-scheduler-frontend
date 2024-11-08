import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import TaskColumn from '../../components/Task/TaskColumn'
import TaskCard from '../../components/Task/TaskCard'
import useTask from '../../hooks/useTask'
import { TaskContext } from '../../context/TaskContext'
export default function Board() {
  const { getAllTasks, updateTask } = useTask()
  const { taskList } = useContext(TaskContext)

  useEffect(() => {
    getAllTasks()
  }, [])

  const [tasks, setTasks] = useState({})

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return

    const sourceColumn = source.droppableId
    const destColumn = destination.droppableId

    const sourceTasks = Array.from(tasks[sourceColumn])
    const destTasks =
      sourceColumn === destColumn ? sourceTasks : Array.from(tasks[destColumn])
    const [reorderedItem] = sourceTasks.splice(source.index, 1)
    destTasks.splice(destination.index, 0, reorderedItem)

    // console.log({sourceColumn,destColumn,destRow:destination.index,_id:reorderedItem._id})
    updateTask(reorderedItem._id, {
      boardColumnId: Number(destColumn),
      boardPosition: Number(destination.index),
    })
    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: sourceTasks,
      ...(sourceColumn !== destColumn && { [destColumn]: destTasks }),
    }))
  }

  useEffect(() => {
    console.log(tasks)
    if (taskList.length > 0) {
      const newTasks = {
        0: taskList.filter((task) => task.boardColumnId === 0),
        1: taskList.filter((task) => task.boardColumnId === 1),
        2: taskList.filter((task) => task.boardColumnId === 2),
      }
      setTasks(newTasks)
    }
  }, [taskList])
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-2">
        <TaskColumn title="Recently Assigned" tasks={tasks[0]} id="0" />
        <TaskColumn title="Do Today" tasks={tasks[1]} id="1" />
        <TaskColumn title="Do Later" tasks={tasks[2]} id="2" />
      </div>
    </DragDropContext>
  )
}
