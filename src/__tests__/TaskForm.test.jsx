import { render, fireEvent, waitFor, act } from '@testing-library/react'
import TaskForm from '../components/Task/TaskForm'

describe('TaskForm Component', () => {
  const onSubmitMock = jest.fn()
  const handleCloseModalMock = jest.fn()

  const defaultProps = {
    formtTitle: 'Add Task',
    onSubmit: onSubmitMock,
    defaultValues: null,
    handleCloseModal: handleCloseModalMock,
    open: true,
  }

  const setup = (props = {}) => {
    return render(<TaskForm {...defaultProps} {...props} />)
  }

  test('Renders successfully', () => {
    const { getByTestId } = setup()
  })

  test('Submits valid form data', async () => {
    const { getByTestId } = setup()

    // Fill out the form
    fireEvent.change(getByTestId('title'), {
      target: { value: 'Task Title' },
    })
    fireEvent.change(getByTestId('description'), {
      target: { value: 'Task Description' },
    })
    fireEvent.change(getByTestId('due_date'), {
      target: { value: '2023-12-31' },
    })

    // Submit the form
    fireEvent.click(getByTestId('submit_task'))

    // Wait for any async actions
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        title: 'Task Title',
        description: 'Task Description',
        due_date: '2023-12-31',
      })
    })
  })

  test('Submits with default values loaded', () => {
    const defaultValues = {
      title: 'Edit Task Title',
      description: 'Edit Task Description',
      dueDate: '2023-11-01',
    }

    const { getByTestId } = setup({ defaultValues })

    expect(getByTestId('title').value).toBe(defaultValues.title)
    expect(getByTestId('description').value).toBe(defaultValues.description)
    expect(getByTestId('due_date').value).toBe('2023-11-01')
  })
})
