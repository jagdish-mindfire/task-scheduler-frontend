import { useEffect, useState } from "react";
import moment from "moment";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTask from "../../hooks/useTask";
import CONSTANTS_STRING from "../../constants/strings";
export default function EditTask({ taskOperations, setTaskOperations }) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [buttonDisbled, setButtonDisbled] = useState(true);
  const { updateTask } = useTask();

  const schema = z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    dueDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid due date",
    }),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema),defaultValues: {
    title: taskOperations.taskData.title || 'adsadsf',
    description: taskOperations?.taskData?.description || '',
    dueDate:  moment(taskOperations?.taskData?.dueDate).format(
      "YYYY-MM-DD hh:mm:ss"
    ),
  }, });

  useEffect(()=>{
    if (taskOperations?.taskData) {
      reset({
        title: taskOperations.taskData.title || '',
        description: taskOperations.taskData.description || '',
        dueDate: moment(taskOperations?.taskData?.dueDate).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
      });
    }
  }, [taskOperations, reset]);

  const onUpdate = (data) => {
    console.log(data);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  useEffect(() => {
    setNewTask({
      title: taskOperations?.taskData?.title,
      description: taskOperations?.taskData?.description,
      due_date: moment(taskOperations?.taskData?.dueDate).format(
        "YYYY-MM-DD hh:mm:ss"
      ),
    });
  }, [taskOperations?.taskData]);

  useEffect(() => {
    if (
      newTask?.title?.length > 0 &&
      newTask?.description?.length &&
      newTask?.due_date?.length > 0
    ) {
      setButtonDisbled(false);
    } else {
      setButtonDisbled(true);
    }
  }, [newTask]);

  const handleCloseModal = () => {
    setTaskOperations({
      ...taskOperations,
      showEditTask: false,
      showViewTask: false,
    });
  };

  return (
    <Dialog
      open={taskOperations.showEditTask}
      onClose={handleCloseModal}
      className="relative z-10"
    >  <form onSubmit={handleSubmit(onUpdate)}>
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
                  <DialogTitle
                    as="h2"
                    className="mb-7 text-base font-semibold leading-6 text-gray-900 text-center "
                  >
                    {CONSTANTS_STRING.UPDATE_TASK}
                    <hr />
                  </DialogTitle>

                  <div className="flex flex-col space-y-5">
                  
                      <label className="block my-4">
                        <span className="text-gray-700">
                          {CONSTANTS_STRING.TITLE}
                        </span>
                        <span className="text-red-700">*</span>
                        <input
                          data-testid={"edittask_title"}
                          {...register("title")}
                          type="text"
                          className={
                            (errors.title
                              ? " ring-red-700 focus:ring-red-700 "
                              : "ring-gray-300 focus:ring-indigo-600") +
                            " block w-full rounded-md border-0 py-3 p-4 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  "
                          }
                          placeholder=""
                        />
                        {errors.title && (
                          <label className="text-red-700">
                            {errors.title.message}
                          </label>
                        )}
                      </label>

                      <label className="block my-4">
                        <span className="text-gray-700">
                          {CONSTANTS_STRING.DESCRIPTION}
                        </span>
                        <span className="text-red-700">*</span>
                        <textarea
                          data-testid={"edittask_description"}
                          {...register("description")}
                          className={
                            (errors.description
                              ? " ring-red-700 focus:ring-red-700 "
                              : "ring-gray-300 focus:ring-indigo-600") +
                            " block w-full rounded-md border-0 py-3 p-4 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  "
                          }
                          rows="3"
                        ></textarea>
                        {errors.description && (
                          <label className="text-red-700">
                            {errors.description.message}
                          </label>
                        )}
                      </label>

                      <label className="block ">
                        <span className="text-gray-700">
                          {CONSTANTS_STRING.DUE_DATE}
                        </span>
                        <span className="text-red-700">*</span>
                        <input
                          data-testid={"edittask_due_date"}
                          {...register("dueDate")}
                          type="datetime-local"
                          className={
                            (errors.dueDate
                              ? " ring-red-700 focus:ring-red-700 "
                              : "ring-gray-300 focus:ring-indigo-600") +
                            " block w-full rounded-md border-0 py-3 p-4 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  "
                          }
                        />
                        {errors.dueDate && (
                          <label className="text-red-700">
                            {errors.dueDate.message}
                          </label>
                        )}
                      </label>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                data-autofocus
                data-testid={"edittask_submit"}
                // disabled={buttonDisbled}
                // onClick={() => {
                //   updateTask(taskOperations?.taskData?._id, newTask);
                //   handleCloseModal();
                // }}
                className="inline-flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-500 sm:mt-0 sm:w-auto"
              >
                {CONSTANTS_STRING.UPDATE_TASK}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
      </form>
    </Dialog>
  );
}
