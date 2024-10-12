import useTask from "../../hooks/useTask";
import TaskForm from "./TaskForm";
import {ShowTaskUpdateToast} from "../../services/toastService";
import CONSTANTS_STRING from "../../constants/strings";

export default function EditTask({ taskOperations, setTaskOperations }) {
 
  const { updateTask } = useTask();

  const onSubmit = (data) => {
    updateTask(taskOperations?.taskData?._id,data);
    setTaskOperations({
      ...taskOperations,
      showEditTask: false,
      showViewTask: false,
    });
    ShowTaskUpdateToast();
  };

  const handleCloseModal = () => {
    setTaskOperations({
      ...taskOperations,
      showEditTask: false,
      showViewTask: false,
    });
  };

  return (<TaskForm formtTitle={CONSTANTS_STRING.UPDATE_TASK} onSubmit={onSubmit} defaultValues={taskOperations?.taskData} handleCloseModal={handleCloseModal} open={taskOperations?.showEditTask}/>);
}
