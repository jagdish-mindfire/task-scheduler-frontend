import React, { useState, useRef, useEffect,useContext } from "react";
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
import { Button } from "../../components/Common/Button";
import TaskDetails from "./TaskDetails";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/Common/Popover";
import useTask from "../../hooks/useTask.js";
import { TaskContext } from "../../context/TaskContext.jsx";

import DueDateInput from "../../components/Common/DueDateInput";
import { format, parseISO } from "date-fns";

export default function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "this is the new task",
      completed: true,
      dueDate: "2023-10-01",
      project: "Cross-func...",
      visibility: "My workspace",
    },
    {
      id: 2,
      title: "Draft project brief",
      completed: true,
      dueDate: "2023-10-24",
      project: "Cross-func...",
      visibility: "My workspace",
    },
    {
      id: 3,
      title: "this is another task",
      completed: false,
      dueDate: "",
      project: "",
      visibility: "Only me",
    },
    {
      id: 4,
      title: "this is new task",
      completed: false,
      dueDate: "",
      project: "",
      visibility: "Only me",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDueDate, setSelectedDueDate] = useState(false);
  const editInputRef = useRef(null);

  const { taskList, taskLoader } = useContext(TaskContext);

  const { sortTasks,updateTask } = useTask();
  const updatingRef = useRef(false);

  // const { updateModelStates, setTaskData } = useContext(TaskModelStates);


  useEffect(() => {
    if (editingTaskId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTaskId]);

  console.log(taskList);
  const toggleTaskCompletion = async (task) => {
    if(!updatingRef.current){
      updatingRef.current = true;
      let updateCompleteStatus = task.isCompleted ? 0 : 1;
      await updateTask(task._id,{is_completed : updateCompleteStatus});
      updatingRef.current = false;
    }

    // setTasks(
    //   taskList.map((task) =>
    //     task._id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    //   )
    // );
  };

  const openTaskDetails = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  const startEditingTitle = (taskId, currentTitle) => {
    setEditingTaskId(taskId);
    setEditingTitle(currentTitle);
  };

  const handleTitleEdit = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: editingTitle } : task
      )
    );
    setEditingTaskId(null);
  };

  const handleDueDateEdit = (taskId, newDueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              dueDate: newDueDate ? format(newDueDate, "yyyy-MM-dd") : "",
            }
          : task
      )
    );
  };

  useEffect(()=>{
    console.log('sasdfadfasdf');
    console.log(taskList);
  },[taskList])
  return (
    <div className="relative">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task name
            </th>

            <th
              className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={()=>{}}
            >
              Due date
              {sortOrder === "asc" ? (
                <ChevronUp className="inline-block w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="inline-block w-4 h-4 ml-1" />
              )}
            </th>

            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project 
            </th>
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>

          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <tr
              key={task._id}
              className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTaskCompletion(task)}
                    className="mr-1 borber border-green-700"
                  >
                    {task.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
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
                      onBlur={() => handleTitleEdit(task._id)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleTitleEdit(task._id);
                        }
                      }}
                      className="bg-transparent focus:outline-none text-xs w-full  "
                    />
                  ) : (
                    <span
                      className={`cursor-pointer text-xs ${
                        task.isCompleted ? "text-gray-500" : "font-bold"
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
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="cursor-pointer flex items-center">
                      <DueDateInput selectedDueDate={selectedDueDate} setSelectedDueDate={setSelectedDueDate} task={task}/>
                    </div>
                  </PopoverTrigger>
                </Popover>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs">
                {task.project && (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold  bg-green-100 text-green-800">
                    {task?.project}
                  </span>
                )}
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <TaskDetails task={selectedTask} onClose={closeTaskDetails} />
      )}
    </div>
  );
}
