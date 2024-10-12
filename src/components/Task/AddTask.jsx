import TaskForm from './TaskForm';
import CONSTANTS_STRING from '../../constants/strings';
import useTask from '../../hooks/useTask';
import {ShowAddTaskToast} from '../../services/toastService';

export default function AddTask({taskOperations,setTaskOperations}) {

  const {addTask} = useTask();
  
  const handleCloseModal = () => {
    setTaskOperations({...taskOperations,showAddTask:false});
  }
  const createNewTask = async (data)=>{
    await addTask(data);
    setTaskOperations({...taskOperations,showAddTask:false});
    ShowAddTaskToast();
  }

  return (
    <TaskForm open={taskOperations.showAddTask}  formtTitle={CONSTANTS_STRING.ADD_TASK} onSubmit={createNewTask} handleCloseModal={handleCloseModal} />
  ) 
 
}
