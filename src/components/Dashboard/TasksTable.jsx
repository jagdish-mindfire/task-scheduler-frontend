import moment from "moment";
import { TiArrowUnsorted } from "react-icons/ti";
export default function TasksTable  ({taskList,setTaskData,setViewTask,sortTasks}) {
    
    return ( <div className="overflow-x-auto rounded">
        <table className="min-w-full bg-white border border-gray-300 ">
            <thead>
                <tr className="text-left bg-green-300 ">
                    <th className="py-2 px-4 border-b">Task Name</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    
                    
                    <th className="py-2 px-4 border-b inline-flex cursor-pointer" data-testid={"sort_tasks"} onClick={sortTasks}><a>Due Date </a><TiArrowUnsorted /></th>
                    <th className="py-2 px-4 border-b">Actions</th>

                </tr>
            </thead>
            <tbody className='text-left'>
                {taskList?.map((task, index) => (
                    <tr key={index}  onClick={() => { setTaskData(task); setViewTask(true) }} className={task?.isCompleted ? 'bg-green-50 hover:bg-green-100' :' hover:bg-gray-50' }>
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
                        <td className="py-2 px-4 border-b">{moment(task?.dueDate).format('LLL')}</td>
                        <td className="py-2 px-4 border-b flex gap-2">
                            <button
                                  data-testid={"view_task"}
                                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                                onClick={() => { setTaskData(task); setViewTask(true); }}
                            >
                                View
                            </button>
                  

                        </td>
                    </tr>
                ))}
                {taskList?.length === 0 && (
                    <tr>
                        <td colSpan="5" className="py-2 px-4 text-center font-bold">
                            Click on Add Task to create your first task
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>);
};