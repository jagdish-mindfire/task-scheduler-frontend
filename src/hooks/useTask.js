import { useEffect,useContext,useRef } from "react";
import useCallAPI from './useCallAPI';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from "../context/TaskContext";
import io from "socket.io-client";
import { toast } from 'react-hot-toast';
import moment from 'moment';

const useTask = ({}) => {
    const { setAllNotifications ,setTaskList} = useContext(TaskContext);
    const callingSortingAPI = useRef(false);
    const { callAuthAPI } = useCallAPI();
    const { accessToken } = useContext(AuthContext);
    const [sortingType, setSortingType] = useState('asc');


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

      const getAllTasks = async (sortingType) => {
        try {
            const response = await callAuthAPI({ url: `/task/?sort=${sortingType}`, method: 'GET' });
            setTaskList(response?.data?.tasks);
        } catch (error) {
            console.log(error);
        }
    };

}
export default useTask;