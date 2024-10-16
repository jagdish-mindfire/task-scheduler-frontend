
import { useContext } from "react";
import moment from "moment";
import { TiArrowUnsorted } from "react-icons/ti";
import CONSTANTS_STRING from "../../constants/strings";
import { TaskModelStates } from '../../context/TaskModelStates';
import { TaskContext } from "../../context/TaskContext.jsx";
import useTask from "../../hooks/useTask.js";
export default function TasksTable  () {
    const { taskList } = useContext(TaskContext);
    const { sortTasks } = useTask();

    const {updateModelStates,setTaskData} = useContext(TaskModelStates);
    const hanldeViewTask = (task) =>{
        setTaskData(task);
        updateModelStates({showViewTask: true});
    }
    return ( <div className="overflow-x-auto rounded">
        <table className="min-w-full bg-white border border-gray-300 ">
            <thead>
                <tr className="text-left bg-gray-500 text-zinc-50">
                    <th className="py-2 px-4 border-b">{CONSTANTS_STRING.TASK_NAME}</th>
                    <th className="py-2 px-4 border-b">{CONSTANTS_STRING.DESCRIPTION}</th>
                    <th className="py-2 px-4 border-b inline-flex cursor-pointer" data-testid={"sort_tasks"} onClick={sortTasks}><a>{CONSTANTS_STRING.DUE_DATE} </a><TiArrowUnsorted /></th>
                    <th className="py-2 px-4 border-b">{CONSTANTS_STRING.ACTIONS}</th>
                </tr>
            </thead>
            <tbody className='text-left'>
                {taskList?.map((task, index) => (
                    <tr key={index}  onClick={() => hanldeViewTask(task)} className='hover:bg-gray-50'>
                        <td className="py-2 px-4 border-b font-bold">{task?.title}           
                          {
                            task?.isCompleted ? 
                            <span className="bg-green-800 text-white text-xs font-medium h-6 p-1 ml-3 rounded dark:bg-red-900 dark:text-red-300">Completed</span>
                            :
                            (
                            new Date() - new Date(task?.dueDate) > 0 ? 
                            <span className="bg-pink-700 text-white text-xs font-medium h-6 p-1 ml-3 rounded dark:bg-red-900 dark:text-red-300">Over Due</span>
                            : <span className="bg-blue-500 text-white text-xs font-medium h-6 p-1 ml-3 rounded dark:bg-red-900 dark:text-red-300">Pending</span>
                          )
                          }
                          </td>
                        <td className="py-2 px-4 border-b">{task?.description}</td>
                        <td className="py-2 px-4 border-b">{moment(task?.dueDate).format('ll')}</td>
                        <td className="py-2 px-4 border-b flex gap-2">
                            <button
                                  data-testid={"view_task"}
                                className="bg-zinc-700 text-white px-4 py-2 rounded-full hover:bg-zinc-900"
                            >
                                 {CONSTANTS_STRING.VIEW}
                            </button>
                        </td>
                    </tr>
                ))}
                {taskList?.length === 0 && (
                    <tr>
                        <td colSpan="5" className="py-2 px-4 text-center font-bold">
                           {CONSTANTS_STRING.CREATE_FIRST_TASK}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>);
};