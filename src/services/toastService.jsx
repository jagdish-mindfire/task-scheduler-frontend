import CONSTANTS_STRING from '../constants/strings'
import { toast } from 'react-toastify'
import moment from 'moment'

const successSettings = {
  position: 'bottom-left',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
}

const errorSettings = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
}
export const showTaskDeleteToast = () => {
  toast.success(CONSTANTS_STRING.DELETE_SUCCESS, successSettings)
}

export const showAddTaskToast = () => {
  toast.success(CONSTANTS_STRING.TASK_CREATE_SUCCESS, successSettings)
}

export const showTaskCompletionToast = () => {
  toast.success(CONSTANTS_STRING.MARKED_AS_COMPLETE, successSettings)
}

export const showTaskUpdateToast = () => {
  toast.success(CONSTANTS_STRING.TASK_UPDATED_SUCCESS, successSettings)
}

export const showErrorToast = (errorMessage) => {
  toast.error(errorMessage, errorSettings)
}

export const showSuccessToast = (message) => {
  toast.success(message, successSettings)
}

export const showNotificationToast = ({ type, data }) => {
  let jsxForToast = null
  if (type === 'overdue') {
    jsxForToast = (
      <div>
        <h4 className="toast-title">{data?.title} Task is Overdue</h4>
        <span>Due Date was {moment(data?.dueDate).format('ll')}</span>
      </div>
    )
  } else {
    jsxForToast = (
      <div>
        <h4 className="toast-title">{data?.title} Reminder</h4>
        <p className="toast-description">
          Don't forget to complete your task before{' '}
          {moment(data?.dueDate).format('ll')} !
        </p>
      </div>
    )
  }

  toast.info(jsxForToast, {
    position: 'top-right',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  })
}
