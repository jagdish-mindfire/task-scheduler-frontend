import moment from 'moment';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import useTask from '../../hooks/useTask';
import CONSTANTS_STRING from '../../constants/strings';

export default function ViewTask({taskOperations,setTaskOperations}) {
 
    const {updateTask,deleteTask} = useTask();

    const handleCloseModal = () => {
      setTaskOperations({...taskOperations,showViewTask:false});
    };

  return (
    <>
    <Dialog open={taskOperations.showViewTask} onClose={handleCloseModal} className="relative z-10 ">
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
            <div className={(taskOperations?.taskData?.isCompleted ? "bg-green-50" :"bg-blue-50")+ " px-4 pb-4 pt-5 sm:p-6 sm:pb-4 "}>
              <div className="sm:flex sm:items-start">
               
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    {taskOperations?.taskData?.title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     {taskOperations?.taskData?.description}
                    </p>
                    <p className="text-sm text-gray-500">
                   {CONSTANTS_STRING.CREATED_AT}: {moment(taskOperations?.taskData?.createdAt).format('lll')}
                    </p>
                    <p className="text-sm text-gray-500">
                    {CONSTANTS_STRING.DUE_DATE}: {moment(taskOperations?.taskData?.dueDate).format('lll')}
                    </p>
                    {taskOperations?.taskData?.isCompleted ? 
                    <p className="text-sm text-gray-500">
                     {CONSTANTS_STRING.COMPLETED_AT} : {moment(taskOperations?.taskData?.updatedAt).format('lll')}
                    </p> : <></>
                    }
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={(taskOperations?.taskData?.isCompleted ? "bg-green-50" :"bg-blue-50")+ " flex items-center space-x-4 justify-end p-4"}>
              {taskOperations?.taskData?.isCompleted ? <></> :
                <>
              <button
                type="button"
                data-testid={"mark_complete"}
                data-autofocus
                onClick={() => {updateTask(taskOperations?.taskData?._id,{is_completed:1});handleCloseModal(

                );}}
                className="rounded-md bg-green-400 px-5 py-2  text-sm font-semibold text-gray-900 shadow-sm  hover:bg-green-500"
                >
                {CONSTANTS_STRING.MARK_COMPLETE}
              </button>
              <button
                type="button"
                data-testid={"edit"}
                data-autofocus
                onClick={() => {setTaskOperations({...taskOperations,showViewTask:false,showEditTask:true})}}
                className="rounded-md bg-blue-400 px-5 py-2  text-sm font-semibold text-gray-900 shadow-sm  hover:bg-bue-500"
                >
                {CONSTANTS_STRING.EDIT}
              </button>
                </>
            }
              <button
                type="button"
                data-testid={"delete"}
                onClick={() => {deleteTask(taskOperations?.taskData?._id);handleCloseModal()}}
                className="rounded-md bg-red-400 px-5 py-2  text-sm font-semibold text-gray-900 shadow-sm  hover:bg-red-500"
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
