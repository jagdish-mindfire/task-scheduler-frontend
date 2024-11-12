import { endpoints } from '../constants/endpoints';
import { appApi } from './apiService';

const api = new appApi();

export const fetchAllTasks = async (sortingType) => {
  const response = await api.get(endpoints.GET_ALL_TASKS, {
    sort: sortingType,
  });
  return response;
};

export const fetchTask = async (taskId) => {
  const response = await api.get(endpoints.TASK_DETAIL + '/' + taskId);
  return response;
};

export const CreateNewTask = async (task) => {
  const response = await api.post(endpoints.CREATE_TASK, task);
  return response;
};

export const UpdateTask = async (id, updatedTask) => {
  const response = await api.update(
    endpoints.UPDATE_TASK + `/${id}`,
    updatedTask
  );
  return response;
};

export const DeleteTask = async (id) => {
  const response = await api.delete(endpoints.DELETE_TASK + `/${id}`);
  return response;
};
