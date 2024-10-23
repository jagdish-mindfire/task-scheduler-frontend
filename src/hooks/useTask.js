import { useState, useContext, useRef } from "react";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from '@apollo/client';
import {FETCH_ALL_TASKS_QUERY} from '../graphql/query'
import {
  FetchAllTasks,
  CreateNewTask,
  UpdateTask,
  DeleteTask,
} from "../services/taskService";
import { ShowErrorToast } from "../services/toastService";
import client from "../graphql/client";

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

  // const getAllTasks = async (sortingType) => {
  //   try {
  //     setTaskLoader(true);
  //     const tasks = await FetchAllTasks(sortingType);
  //     setTaskList(tasks);
  //   } catch (error) {
  //     console.error(error);
  //     ShowErrorToast(error?.response?.data?.message || error?.message);
  //   }finally{
  //     setTaskLoader(false);
  //   }
  // };



  const getAllTasks = async (sortingType="asc") => {
    try {
      setTaskLoader(true);
      const { data } = await client.query({
        query: FETCH_ALL_TASKS_QUERY,
        variables: { sort:sortingType },
      });
      console.log(data.getAllTasks);
      setTaskList(data.getAllTasks || []);
    } catch (error) {
      console.error(error);
      ShowErrorToast(error.message);
    } finally {
      setTaskLoader(false);
    }
  };


  const { data, refetch } = useQuery(FETCH_ALL_TASKS_QUERY, {
    variables: { sortingType },
    skip: !sortingType, // Skip if sortingType is not set
    onCompleted: (data) => {console.log('heeij',data);return setTaskList(data.tasks)},
    onError: (error) => ShowErrorToast(error.message),
  });



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
