import { useContext } from "react";
import useTask from "../../hooks/useTask";
import TaskForm from "./TaskForm";
import {ShowTaskUpdateToast} from "../../services/toastService";
import CONSTANTS_STRING from "../../constants/strings";
import { TaskModelStates } from '../../context/TaskModelStates';
export default function EditTask() {
 
  const { updateTask } = useTask();
  const {modelStates,updateModelStates,taskData} = useContext(TaskModelStates);

  const onSubmit = (data) => {
    updateTask(taskData?._id,data);
    updateModelStates({showEditTask: false,showViewTask: false});
    ShowTaskUpdateToast();
  };

  const handleCloseModal = () => {
    updateModelStates({showEditTask: false,showViewTask: true});
  };

  return (<TaskForm formtTitle={CONSTANTS_STRING.UPDATE_TASK} onSubmit={onSubmit} defaultValues={taskData} handleCloseModal={handleCloseModal} open={modelStates?.showEditTask}/>);
}
