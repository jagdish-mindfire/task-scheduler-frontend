import { useContext } from 'react'
import TaskForm from './TaskForm'
import CONSTANTS_STRING from '../../constants/strings'
import useTask from '../../hooks/useTask'
import { showAddTaskToast } from '../../services/toastService'
import { TaskModelStates } from '../../context/TaskModelStates'

export default function AddTask() {
  const { addTask } = useTask()
  const { modelStates, updateModelStates } = useContext(TaskModelStates)

  const handleCloseModal = () => {
    updateModelStates({ showAddTask: false })
  }
  const createNewTask = async (data) => {
    await addTask(data)
    updateModelStates({ showAddTask: false })
    showAddTaskToast()
  }

  return (
    <TaskForm
      open={modelStates.showAddTask}
      formtTitle={CONSTANTS_STRING.ADD_TASK}
      onSubmit={createNewTask}
      handleCloseModal={handleCloseModal}
    />
  )
}
