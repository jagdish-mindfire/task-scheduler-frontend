import { useState, useContext, useRef } from 'react'
import { TaskContext } from '../context/TaskContext'
import {
  fetchAllTasks,
  createNewTask,
  updateTaskDetails,
  deleteTask,
  fetchTask,
} from '../services/taskService'
import { showErrorToast, showTaskDeleteToast } from '../services/toastService'
import { useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'

const useTask = () => {
  const { setTaskList, taskList, setTaskLoader, task, setTask } =
    useContext(TaskContext)
  const callingSortingAPI = useRef(false)
  const [sortingType, setSortingType] = useState('asc')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const sortTasks = async () => {
    if (!callingSortingAPI.current) {
      callingSortingAPI.current = true
      const cuurectSortingType = sortingType
      setSortingType((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      await getAllTasks(cuurectSortingType === 'asc' ? 'desc' : 'asc')
      callingSortingAPI.current = false
    }
  }

  const getAllTasks = async (sortingType) => {
    try {
      setTaskLoader(true)
      const data = await queryClient.fetchQuery({
        queryKey: ['allTasks', sortingType],
        queryFn: () => fetchAllTasks(sortingType),
      })
      setTaskList(data)
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message)
    } finally {
      setTaskLoader(false)
    }
  }

  const getSingleTask = async (taskId) => {
    try {
      setTaskLoader(true)
      const data = await queryClient.fetchQuery({
        queryKey: ['getSingleTask', taskId],
        queryFn: () => fetchTask(taskId),
      })
      setTask(data.task)
    } catch (error) {
      navigate('/home')
      showErrorToast(error?.response?.data?.message || error?.message)
    } finally {
      setTaskLoader(false)
    }
  }

  const addTask = async (task) => {
    try {
      const response = await createNewTask(task)
      setTaskList([...taskList, response.task])
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message)
      console.log(error)
    }
  }

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await updateTaskDetails(id, updatedTask)
      console.log(response)
      setTaskList((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response?.task : task)),
      )
      if (task?._id) {
        setTask(response.task)
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message)
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id))
      showTaskDeleteToast()
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message)
      console.log(error)
    }
  }

  return {
    sortTasks,
    getAllTasks,
    addTask,
    deleteTask,
    updateTask,
    getSingleTask,
  }
}
export default useTask
