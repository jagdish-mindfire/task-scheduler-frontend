import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import ViewTask from './ViewTask';
import AddTask from './AddTask';
import useCallAPI from '../hooks/useCallAPI';
import { TaskContext } from '../context/TaskContext';

const TasksTable = ({ tasks, onComplete, onEdit }) => {
    const [viewTask, setViewTask] = useState(false);
    const [taskData, setTaskData] = useState({});
    const [showAddTask, setShowAddTask] = useState(false);
    const { callAuthAPI } = useCallAPI();
    const { taskList, setTaskList } = useContext(TaskContext);

    useEffect(() => {
        const getAllTasks = async () => {
            try {
                const response = await callAuthAPI({ url: '/task/', method: 'GET' });
                setTaskList(response?.data?.tasks);
            } catch (error) {
                console.log(error);
            }
        };
        getAllTasks();
    }, []);

    return (
        <>
            <div className="p-4 text-center">
                <ViewTask open={viewTask} setOpen={setViewTask} taskData={taskData} />
                <AddTask open={showAddTask} setOpen={setShowAddTask} />
                <div className="flex flex-wrap items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4">Tasks List</h2>
                    <button
                        onClick={() => setShowAddTask(true)}
                        className="p-3 m-3 rounded-md bg-green-400 font-semibold text-gray-900 hover:bg-green-500"
                    >
                        Add Task
                    </button>
                </div>

                {/* Responsive table */}
                <div className="w-full">
                    <table className="table-auto w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-2 sm:px-4 px-1 border-b text-sm">Task Name</th>
                                <th className="py-2 sm:px-4 px-1 border-b text-sm">Description</th>
                                <th className="py-2 sm:px-4 px-1 border-b text-sm">Status</th>
                                <th className="py-2 sm:px-4 px-1 border-b text-sm">Due Date</th>
                                <th className="py-2 sm:px-4 px-1 border-b text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-left'>
                            {taskList?.map((task, index) => (
                                <tr key={index} className={task?.isCompleted ? 'bg-green-50 hover:bg-green-100' : 'hover:bg-gray-50'}>
                                    <td className="py-2 sm:px-4 px-2 border-b text-sm">{task?.title}</td>
                                    <td className="py-2 sm:px-4 px-2 border-b text-sm">{task?.description}</td>
                                    <td className="py-2 sm:px-4 px-2 border-b text-sm">{task?.isCompleted ? 'Completed' : 'Pending'}</td>
                                    <td className="py-2 sm:px-4 px-2 border-b text-sm">{moment(task?.dueDate).format('LL')}</td>
                                    <td className="py-2 sm:px-4 px-2 border-b text-sm flex gap-2">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            onClick={() => { setTaskData(task); setViewTask(true); }}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {taskList?.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-2 sm:px-4 px-2 text-center font-bold">
                                        Click on Add Task to create your first task
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TasksTable;
