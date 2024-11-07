"use client";

import React, { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../../components/task/TaskColumn";
import useTask from "../../hooks/useTask";
import { TaskContext } from "../../context/TaskContext";

export default function Board() {
  const { getAllTasks, updateTask } = useTask();
  const { taskList } = useContext(TaskContext);

  useEffect(() => {
    getAllTasks();
  }, []);

  const [tasks, setTasks] = useState({
    0: [],
    1: [],
    2: [],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const sourceTasks = Array.from(tasks[sourceColumn]);
    const destTasks =
      sourceColumn === destColumn ? sourceTasks : Array.from(tasks[destColumn]);

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    if (sourceColumn !== destColumn) {
      updateTask(movedTask._id, {
        boardColumnId: Number(destColumn),
        boardPosition: Number(destination.index),
      });
    }

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: sourceTasks,
      [destColumn]: destTasks,
    }));
  };

  useEffect(() => {
    if (taskList.length > 0) {
      setTasks({
        0: taskList.filter((task) => task.boardColumnId === 0),
        1: taskList.filter((task) => task.boardColumnId === 1),
        2: taskList.filter((task) => task.boardColumnId === 2),
      });
    }
  }, [taskList]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-2">
        <TaskColumn title="Recently Assigned" tasks={tasks[0]} id="0" />
        <TaskColumn title="Do Today" tasks={tasks[1]} id="1" />
        <TaskColumn title="Do Later" tasks={tasks[2]} id="2" />
      </div>
    </DragDropContext>
  );
}
