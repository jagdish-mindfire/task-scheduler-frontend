import { useEffect, useState,useContext } from 'react'
import moment from 'moment';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { TaskContext } from '../context/TaskContext';
export default function EditTask({open, setOpen,passedTaskData}) {
  const [newTask,setNewTask] = useState({title:'',description:'',due_date:''});
  const [buttonDisbled,setButtonDisbled] = useState(true);
  const {updateTask} = useContext(TaskContext);

  const handleChange = async (e) => {
        const { name, value } = e.target;
        console.log({ name, value }); 
        setNewTask({
          ...newTask,
          [name]: value,
        });
  };
  const handleUpdatetask = async (e) => {

  };
  useEffect(()=>{
    setNewTask({title:passedTaskData?.title, description:passedTaskData?.description, due_date:moment(passedTaskData?.dueDate).format('YYYY-MM-DD hh:mm:ss')});
  },[passedTaskData])
 
  useEffect(()=>{
    if(newTask?.title?.length > 0 && newTask?.description?.length && newTask?.due_date?.length > 0){
        setButtonDisbled(false);
    }else{
        setButtonDisbled(true);
    }
  },[newTask]);
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
               
                <div className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left lg:w-full md:w-full w-72">
                  <DialogTitle as="h2" className="mb-7 text-base font-semibold leading-6 text-gray-900">
                   Add Task
                  </DialogTitle>
            
<div className='flex flex-col space-y-5' >
                <label className="block">
                    <span className="text-gray-700">Title</span><span className="text-red-700">*</span>
                    <input data-testid={"edittask_title"} onChange={handleChange} value={newTask?.title} name='title' type="text" className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder=""/>
                </label>

                <label className="block">
                    <span className="text-gray-700">Description</span><span className="text-red-700">*</span>
                    <textarea data-testid={"edittask_description"} defaultValue={newTask?.description} onChange={handleChange} name='description' className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" rows="3"></textarea>
                </label>

                <label className="block">
                    <span className="text-gray-700">Due Date</span><span className="text-red-700">*</span>
                    <input data-testid={"edittask_due_date"} onChange={handleChange} value={newTask?.due_date} name='due_date' type="datetime-local" className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"/>
                </label>
</div>
              
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                data-testid={"edittask_submit"}
                disabled={buttonDisbled}
                onClick={() => {updateTask(passedTaskData?._id,newTask);setOpen(false)}}
                className="inline-flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-500 sm:mt-0 sm:w-auto"
              >
               Update Task
              </button>
             
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
