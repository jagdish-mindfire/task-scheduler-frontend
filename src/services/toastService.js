import CONSTANTS_STRING from "../constants/strings";
import { toast } from "react-toastify";

const successSettings = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const errorSettings = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
export const ShowTaskDeleteToast = () => {
  toast.success(CONSTANTS_STRING.DELETE_SUCCESS, successSettings);
};

export const ShowAddTaskToast = () => {
  toast.success(CONSTANTS_STRING.TASK_CREATE_SUCCESS, successSettings);
};

export const ShowTaskCompletionToast = () => {
  toast.success(CONSTANTS_STRING.MARKED_AS_COMPLETE, successSettings);
};

export const ShowTaskUpdateToast = () => {
  toast.success(CONSTANTS_STRING.TASK_UPDATED_SUCCESS, successSettings);
};

export const ShowErrorToast = (errorMessage) => {
    toast.error(errorMessage, errorSettings);
  };
  
  
