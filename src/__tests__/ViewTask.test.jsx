import { render, fireEvent } from '@testing-library/react'
import ViewTask from '../components/Task/ViewTask'
import { TaskModelStates } from '../context/TaskModelStates'
import useTask from '../hooks/useTask'

jest.mock('../hooks/useTask')

describe('ViewTask Component', () => {
  const updateTaskMock = jest.fn()
  const deleteTaskMock = jest.fn()

  useTask.mockReturnValue({
    updateTask: updateTaskMock,
    deleteTask: deleteTaskMock,
  })

  const mockTaskModelStates = {
    modelStates: {
      showViewTask: true,
      showAddTask: false,
      showEditTask: false,
      showDeleteConfirmation: false,
    },
    taskData: {
      _id: 1,
      title: 'Complete the frontend testing',
      description: 'This task needs to be completed.',
      createdAt: '2023-10-01T00:00:00Z',
      dueDate: '2023-11-01T00:00:00Z',
      updatedAt: '2023-10-02T00:00:00Z',
      isCompleted: false,
    },
    updateModelStates: jest.fn(),
  }

  const setup = (props = {}) => {
    return render(
      <TaskModelStates.Provider value={{ ...mockTaskModelStates, ...props }}>
        <ViewTask />
      </TaskModelStates.Provider>,
    )
  }

  test('Renders successfully', () => {
    const { getByText, getByTestId } = setup()
  })

  test('Handles marking task as complete', () => {
    const { getByTestId } = setup()

    fireEvent.click(getByTestId('mark_complete'))
    expect(updateTaskMock).toHaveBeenCalledWith(1, { is_completed: 1 })
    expect(mockTaskModelStates.updateModelStates).toHaveBeenCalledWith({
      showViewTask: false,
    })
  })

  test('Handles editing the task', () => {
    const { getByTestId } = setup()

    fireEvent.click(getByTestId('edit'))
    expect(mockTaskModelStates.updateModelStates).toHaveBeenCalledWith({
      showViewTask: false,
      showEditTask: true,
    })
  })

  test('Handles deleting the task', () => {
    const { getByTestId } = setup()

    fireEvent.click(getByTestId('delete'))
    expect(mockTaskModelStates.updateModelStates).toHaveBeenCalledWith({
      showViewTask: false,
      showDeleteConfirmation: true,
    })
  })
})
