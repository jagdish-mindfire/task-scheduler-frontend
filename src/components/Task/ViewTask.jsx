import { useState,useContext } from 'react';
import moment from 'moment';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import useTask from '../../hooks/useTask';
import CONSTANTS_STRING from '../../constants/strings';
import DeleteAlert from '../Common/DeleteAlert';
import { ShowTaskDeleteToast,ShowTaskCompletionToast } from '../../services/toastService';
import { TaskModelStates } from '../../context/TaskModelStates';

export default function ViewTask() {
 
    const {updateTask,deleteTask} = useTask();

    const {modelStates,updateModelStates,taskData} = useContext(TaskModelStates);

    const handleCloseModal = () => {
      updateModelStates({showViewTask:false});
    };

    const handleEditTask = () =>{
      updateModelStates({showViewTask:false,showEditTask:true});
    };

    const handleDeleteTask = () => {
      deleteTask(taskData?._id);
      handleCloseModal();
      handleCloseDeleteAlert();
      ShowTaskDeleteToast();
    };
    
    const hanldeMarkComplete = () => {
      updateTask(taskData?._id,{is_completed:1});
      handleCloseModal();
      ShowTaskCompletionToast();
    };

    const handleCloseDeleteAlert = () => {
      updateModelStates({showDeleteConfirmation:false});
    }
  return (
    <>
    <DeleteAlert taskTitle={taskData?.title} open={modelStates.showDeleteConfirmation} setOpen={handleCloseDeleteAlert} confirmCallback={handleDeleteTask} cancelCallback={()=>updateModelStates({showDeleteConfirmation:false,showViewTask:true})} />
    <Dialog open={modelStates?.showViewTask} onClose={handleCloseModal} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"  
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-zinc-50 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-zinc-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
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
                   {CONSTANTS_STRING.CREATED_AT}: {moment(taskData?.createdAt).format('lll')}
                    </p>
                    <p className="text-sm text-gray-500">
                    {CONSTANTS_STRING.DUE_DATE}: {moment(taskData?.dueDate).format('ll')}
                    </p>
                    {taskData?.isCompleted ? 
                    <p className="text-sm text-gray-500">
                     {CONSTANTS_STRING.COMPLETED_AT} : {moment(taskData?.updatedAt).format('lll')}
                    </p> : <></>
                    }
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex items-center space-x-4 justify-end p-4">
              {taskData?.isCompleted ? <></> :
                <>
              <button
                type="button"
                data-testid={"mark_complete"}
                data-autofocus
                onClick={hanldeMarkComplete}
                className="rounded-md bg-zinc-500 px-5 py-2  text-sm font-semibold text-zinc-50 shadow-sm  hover:bg-zinc-600"
                >
                {CONSTANTS_STRING.MARK_COMPLETE}
              </button>
              <button
                type="button"
                data-testid={"edit"}
                data-autofocus
                onClick={handleEditTask}
                className="rounded-md bg-blue-400 px-5 py-2  text-sm font-semibold text-gray-900 shadow-sm  hover:bg-bue-500"
                >
                {CONSTANTS_STRING.EDIT}
              </button>
                </>
            }
              <button
                type="button"
                data-testid={"delete"}
                onClick={() => {updateModelStates({showViewTask:false,showDeleteConfirmation:true})}}
                className="rounded-md bg-red-600 px-5 py-2  text-sm font-semibold text-zinc-50 shadow-sm  hover:bg-red-700"
                >
                {CONSTANTS_STRING.DELETE}
            </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </>
  )
}
