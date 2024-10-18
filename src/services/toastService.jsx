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

export const ShowNotificationToast = ({type,data}) => {
 let jsxForToast = null;
 if(type === 'overdue'){
    jsxForToast =  <div>
    <h4 className="toast-title">Task is Overdue</h4>
    <p className="toast-description">
      Task is already overdue, please complete !
    </p>
    <span className="toast-date">{new Date().toLocaleString()}</span>
  </div> 
 }else{
    jsxForToast =  <div>
    <h4 className="toast-title">Task Reminder</h4>
    <p className="toast-description">
      Don't forget to complete your task before due date!
    </p>
  </div> 
 }


  toast.info(
    jsxForToast
   ,
    {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
  );
};
