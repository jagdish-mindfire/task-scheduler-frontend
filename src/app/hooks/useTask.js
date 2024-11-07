"use client";

import { useState, useContext, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Updated to next/navigation
import { useQueryClient } from "@tanstack/react-query";

import { TaskContext } from "../context/TaskContext";
import {
  fetchAllTasks,
  CreateNewTask,
  UpdateTask,
  DeleteTask,
  fetchTask,
} from "../services/taskService";
import { ShowErrorToast, ShowTaskDeleteToast } from "../services/toastService";

const useTask = () => {
  const { setTaskList, taskList, setTaskLoader, task, setTask } = useContext(TaskContext);
  const callingSortingAPI = useRef(false);
  const [sortingType, setSortingType] = useState("asc");
  const queryClient = useQueryClient();
  const router = useRouter();

  // Toggle sorting and fetch sorted tasks
  const sortTasks = async () => {
    if (!callingSortingAPI.current) {
      callingSortingAPI.current = true;
      const currentSortingType = sortingType;
      setSortingType((prev) => (prev === "asc" ? "desc" : "asc"));
      await getAllTasks(currentSortingType === "asc" ? "desc" : "asc");
      callingSortingAPI.current = false;
    }
  };

  // Fetch all tasks with sorting
  const getAllTasks = async (sortingType) => {
    try {
      setTaskLoader(true);
      const data = await queryClient.fetchQuery({
        queryKey: ["allTasks", sortingType],
        queryFn: () => fetchAllTasks(sortingType),
      });
      setTaskList(data);
    } catch (error) {
      ShowErrorToast(error?.response?.data?.message || error?.message);
    } finally {
      setTaskLoader(false);
    }
  };

  // Fetch a single task by ID
  const getSingleTask = async (taskId) => {
    try {
      setTaskLoader(true);
      const data = await queryClient.fetchQuery({
        queryKey: ["getSingleTask", taskId],
        queryFn: () => fetchTask(taskId),
      });
      setTask(data.task);
    } catch (error) {
      router.push('/home'); // Redirect to /home if fetching fails
      ShowErrorToast(error?.response?.data?.message || error?.message);
    } finally {
      setTaskLoader(false);
    }
  };

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await CreateNewTask(task);
      setTaskList([...taskList, response.task]);
    } catch (error) {
      ShowErrorToast(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };

  // Update an existing task
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await UpdateTask(id, updatedTask);
      setTaskList((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response?.task : task))
      );
      if (task?._id) {
        setTask(response.task); // Update single task if in context
      }
    } catch (error) {
      ShowErrorToast(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };

  // Delete a task by ID
  const deleteTask = async (id) => {
    try {
      await DeleteTask(id);
      setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id));
      ShowTaskDeleteToast();
    } catch (error) {
      ShowErrorToast(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };

  return { sortTasks, getAllTasks, addTask, deleteTask, updateTask, getSingleTask };
};

export default useTask;
