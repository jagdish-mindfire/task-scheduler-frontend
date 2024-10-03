import React, { useState, useEffect, useContext,useRef } from 'react';
import moment from 'moment';
import io from "socket.io-client";

import ViewTask from '../ViewTask';
import AddTask from '../AddTask';
import useCallAPI from '../../hooks/useCallAPI';
import { TaskContext } from '../../context/TaskContext';
import { AuthContext } from '../../context/AuthContext';
import DashboardHeader from './DashboardHeader';
import { toast } from 'react-hot-toast';
import TasksTable from './TasksTable';

const Dashboard = () => {
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
      if(accessToken){
        try {
          const newSocket = io(apiUrl + '?token='+accessToken);

          newSocket.on("notification", (response) => {

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
                {/* View Task Modal */}
                <ViewTask open={viewTask} setOpen={setViewTask} taskData={taskData} />
                {/* Add Task Modal */}
                <AddTask open={showAddTask} setOpen={setShowAddTask} />
                <DashboardHeader />
                <TasksTable taskList={taskList} setTaskData={setTaskData} setViewTask={setViewTask} sortTasks={sortTasks}/>
            </div>
        </>
    );
};

export default Dashboard;
