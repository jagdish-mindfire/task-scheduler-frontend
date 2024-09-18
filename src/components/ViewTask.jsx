import { useState,useContext } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import moment from 'moment';
import { TaskContext } from '../context/TaskContext';
import EditTask from './EditTask';
export default function ViewTask({open, setOpen,taskData}) {
 
    const {updateTask,deleteTask} = useContext(TaskContext);
    const [showEditModel,setShowEditModel] = useState(false);
  return (
    <>
    <EditTask open={showEditModel} setOpen={setShowEditModel} passedTaskData={taskData}/>
    <Dialog open={open} onClose={setOpen} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className={(taskData?.isCompleted ? "bg-green-50" :"bg-blue-50")+ " px-4 pb-4 pt-5 sm:p-6 sm:pb-4 "}>
              <div className="sm:flex sm:items-start">
               
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    {taskData?.title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     {taskData?.description}
                    </p>
                    <p className="text-sm text-gray-500">
                     Created At : {moment(taskData?.createdAt).format('llll')}
                    </p>
                    <p className="text-sm text-gray-500">
                     Due Date : {moment(taskData?.dueDate).format('ll')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={(taskData?.isCompleted ? "bg-green-50" :"bg-blue-50")+ " px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"}>
              {taskData?.isCompleted ? <></> :
                <>
              <button
                type="button"
                data-autofocus
                onClick={() => {updateTask(taskData?._id,{is_completed:1});setOpen(false);}}
                className="mt-3  ml-3 inline-flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-500 sm:mt-0 sm:w-auto"
                >
                Mark Completed
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => {setOpen(false);setShowEditModel(true)}}
                className="ml-3 mt-3 inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-blue-400 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                >
                Edit
              </button>
                </>
            }
              <button
                type="button"
                onClick={() => {deleteTask(taskData?._id);setOpen(false)}}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                Delete
            </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </>
  )
}