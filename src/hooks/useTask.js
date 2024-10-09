import { useState,useEffect,useContext,useRef } from "react";
import useCallAPI from './useCallAPI';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from "../context/TaskContext";


const useTask = () => {
    const { setTaskList} = useContext(TaskContext);
    const callingSortingAPI = useRef(false);
    const { callAuthAPI } = useCallAPI();
    const [sortingType, setSortingType] = useState('asc');



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
            setTaskList(response?.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
      getAllTasks(sortingType);
    },[])
    return {sortTasks};
}
export default useTask;