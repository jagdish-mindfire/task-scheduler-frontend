import { appApi } from "./apiService";

const api = new appApi();
const TASK_ENDPOINT = "/tasks";
const CREATE_TASK_ENDPOINT = TASK_ENDPOINT + "/create";

export const fetchAllTasks = async (sortingType) => {
  const response = await api.get(TASK_ENDPOINT, { sort: sortingType });
  return response;
};

export const fetchTask = async (taskId) => {
  const response = await api.get(TASK_ENDPOINT + '/' + taskId);
  return response;
};

export const CreateNewTask = async (task) => {
  const response = await api.post(CREATE_TASK_ENDPOINT, task);
  return response;
};

export const UpdateTask = async (id, updatedTask) => {
  const response = await api.update(TASK_ENDPOINT + `/${id}`, updatedTask);
  return response;
};

export const DeleteTask = async (id) => {
  const response = await api.delete(TASK_ENDPOINT + `/${id}`);
  return response;
};