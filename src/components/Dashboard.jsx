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
            <div className="text-center p-4">
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
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-2 px-4 border-b">Task Name</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Due Date</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-left'>
                            {taskList?.map((task, index) => (
                                <tr key={index} className={task?.isCompleted ? 'bg-green-50 hover:bg-green-100' : 'hover:bg-gray-50'}>
                                    <td className="py-2 px-4 border-b">{task?.title}</td>
                                    <td className="py-2 px-4 border-b">{task?.description}</td>
                                    <td className="py-2 px-4 border-b">{task?.isCompleted ? 'Completed' : 'Pending'}</td>
                                    <td className="py-2 px-4 border-b">{moment(task?.dueDate).format('LL')}</td>
                                    <td className="py-2 px-4 border-b flex gap-2">
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
                                    <td colSpan="5" className="py-2 px-4 text-center font-bold">
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
