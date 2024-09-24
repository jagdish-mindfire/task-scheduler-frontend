import React, { useState, useEffect, useContext,useRef } from 'react';
import moment from 'moment';
import io from "socket.io-client";
import ViewTask from './ViewTask';
import AddTask from './AddTask';
import useCallAPI from '../hooks/useCallAPI';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
// import { HiEye, HiEyeOff } from "react-icons/hi";
import { TiArrowUnsorted } from "react-icons/ti";

import { toast } from 'react-hot-toast';

const TasksTable = ({ tasks, onComplete, onEdit }) => {
    const [viewTask, setViewTask] = useState(false);
    const [taskData, setTaskData] = useState({});
    const [showAddTask, setShowAddTask] = useState(false);
    const [sortingType, setSortingType] = useState('asc');

    const callingSortingAPI = useRef(false);

    const { callAuthAPI } = useCallAPI();
    const { taskList, setTaskList,setAllNotifications } = useContext(TaskContext);
    const { accessToken } = useContext(AuthContext);

    const getAllTasks = async (sortingType) => {
        try {
            const response = await callAuthAPI({ url: `/task/?sort=${sortingType}`, method: 'GET' });
            setTaskList(response?.data?.tasks);
        } catch (error) {
            console.log(error);
        }
    };
    
    function playNotificationSound() {
      const sound = document.getElementById("notificationSound");
      sound.currentTime = 0;
      sound.play(); 
  }

    useEffect(() => {
        getAllTasks(sortingType);
    }, []);

    useEffect(() => {
        const getAllNotifications = async () => {
            try {
                const response = await callAuthAPI({ url: '/notification/', method: 'GET' });
                setAllNotifications(response?.data || []);
            } catch (error) {
                console.log(error);
            }
        };
        getAllNotifications();
    }, []);

  

    useEffect(() => {
      const apiUrl =import.meta.env.VITE_API_URL;
      console.log(accessToken);
      if(accessToken){
        try {
          const newSocket = io(apiUrl + '?token='+accessToken);

          console.log("socket connection establish");


          newSocket.on("notification", (response) => {
            console.log('data from socket',response);

            const tasks = response?.data;
            tasks.map(task=>notify(task?.title,task?.dueDate,task?.notificationType));
            setAllNotifications((prev)=>{
              return [...tasks,...prev];
            });
            playNotificationSound();

          });          
        } catch (error) {
          console.error(error);
        }
      }
    },[accessToken]);

    const sortTasks = async () => {
      if(!callingSortingAPI.current){
        callingSortingAPI.current = true;
        const cuurectSortingType = sortingType;
        setSortingType(cuurectSortingType === 'asc'? 'desc' : 'asc');
        await getAllTasks(cuurectSortingType === 'asc'? 'desc' : 'asc');
        callingSortingAPI.current = false;
      }else{
        console.log('Already sorting');
      }
    };

    const notify = (title,dueDate,notificationType) => {
      toast.custom((t) => (
        
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className={(notificationType ==="overdue" ? "bg-red-500 ":"bg-gray-200 ")+" flex-1 w-0 p-4 rounded"}>
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{notificationType ==="overdue" ? `Task Overdue! ${moment(dueDate).format('LT')}`:`Reminder: Task Deadline Approaching`}</p>
                <p className="mt-1 text-lg text-black">{
                  notificationType === "overdue" ?
                 `You missed the deadline for ${title} Complete it as soon as possible.`
                 :`The deadline for ${title} is approaching. You have less than an hour to complete it`
                  }
                </p>
                <p>
                  <span className="mt-1 text-sm text-black">Due Date : {moment(dueDate).format('lll')} </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        duration: Infinity, // Persistent toast
      });
    };
    return (
        <>
            <div className="text-center p-4 mb-12">
            <audio id="notificationSound" src="./bell.mp3" preload="auto"></audio>
                <ViewTask open={viewTask} setOpen={setViewTask} taskData={taskData} />
                <AddTask open={showAddTask} setOpen={setShowAddTask} />
                <div className="flex flex-wrap items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4">Tasks List</h2>
                    <button
                        onClick={() => setShowAddTask(true)}
                        className="p-3 m-3 bg-green-400 font-semibold rounded-full text-gray-900 hover:bg-green-500"
                    >
                        Add Task
                    </button>
                </div>

                {/* Responsive table */}
                <div className="overflow-x-auto rounded">
                    <table className="min-w-full bg-white border border-gray-300 ">
                        <thead>
                            <tr className="text-left bg-green-300 ">
                                <th className="py-2 px-4 border-b">Task Name</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                
                                <a>
                                <th className="py-2 px-4 border-b inline-flex cursor-pointer" onClick={sortTasks}>Due Date <TiArrowUnsorted /></th></a>
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
                </div>
            </div>
        </>
    );
};

export default TasksTable;
