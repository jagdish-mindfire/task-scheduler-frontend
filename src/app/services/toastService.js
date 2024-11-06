import { toast } from "react-toastify";
import moment from "moment";
import CONSTANTS_STRING from "@/app/constants/strings";

const successSettings = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const errorSettings = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
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

export const ShowSuccessToast = (message) => {
  toast.success(message, successSettings);
};

export const ShowNotificationToast = ({type,data}) => {
 let jsxForToast = null;
 if(type === 'overdue'){
    jsxForToast =  <div>
    <h4 className="toast-title">{data?.title} Task is Overdue</h4>
    <span>Due Date was {moment(data?.dueDate).format('ll')}</span>
  </div> 
 }else{
    jsxForToast =  <div>
    <h4 className="toast-title">{data?.title} Reminder</h4>
    <p className="toast-description">
      Don't forget to complete your task before {moment(data?.dueDate).format('ll')} !
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