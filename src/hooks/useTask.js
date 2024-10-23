import { useState, useContext, useRef } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  FetchAllTasks,
  CreateNewTask,
  UpdateTask,
  DeleteTask,
} from "../services/taskService";
import { ShowErrorToast } from "../services/toastService";

const useTask = () => {
  const { setTaskList, taskList,setTaskLoader } = useContext(TaskContext);
  const callingSortingAPI = useRef(false);
  const [sortingType, setSortingType] = useState("asc");

  const sortTasks = async () => {
    if (!callingSortingAPI.current) {
      callingSortingAPI.current = true;
      const cuurectSortingType = sortingType;
      setSortingType(prev=>prev === "asc" ? "desc" : "asc");
      await getAllTasks(cuurectSortingType === "asc" ? "desc" : "asc");
      callingSortingAPI.current = false;
    }
  };

  const getAllTasks = async (sortingType) => {
    try {
      setTaskLoader(true);
      const tasks = await FetchAllTasks(sortingType);
      setTaskList(tasks);
    } catch (error) {
      console.error(error);
      ShowErrorToast(error?.response?.data?.message || error?.message);
    }finally{
      setTaskLoader(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await CreateNewTask(task);
      setTaskList([...taskList, response.task]);
    } catch (error) {
      ShowErrorToast(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await UpdateTask(id, updatedTask);
      console.log(response);
      setTaskList((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response?.task : task))
      );
    } catch (error) {
      ShowErrorToast(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      await DeleteTask(id);
      setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      ShowErrorToast(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };

  return { sortTasks, getAllTasks, addTask, deleteTask, updateTask };
};
export default useTask;
