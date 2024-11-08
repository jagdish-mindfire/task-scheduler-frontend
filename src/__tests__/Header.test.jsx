global.ResizeObserver = class {
  constructor(callback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

import { render, fireEvent, act } from '@testing-library/react'

// To Test
import Header from '../components/Layout/Header'
import useNotification from '../hooks/useNotification'

import { MemoryRouter } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext'

jest.mock('../hooks/useNotification')

const mockTaskContext = {
  taskList: [],
  setTaskList: jest.fn(),
  allNotifications: [],
  setAllNotifications: jest.fn(),
  notificationCount: 3,
  setNotificationCount: jest.fn(),
  taskLoader: false,
}

describe('Header Component', () => {
  const component = (
    <MemoryRouter>
      <TaskContext.Provider value={mockTaskContext}>
        <Header />
      </TaskContext.Provider>
    </MemoryRouter>
  )

  const clearNotificationMock = jest.fn()
  const clearAllNotificationsMock = jest.fn()

  useNotification.mockReturnValue({
    clearNotification: clearNotificationMock,
    clearAllNotifications: clearAllNotificationsMock,
  })

  test('Renders successfully', () => {
    render(component)
  })

  test('Successfully clicked on Clear all notificatoin', () => {
    const { getByTestId } = render(component)
    const bellIcon = getByTestId('bell_icon')

    fireEvent.click(bellIcon)
    const clearAllNotificatoinButotn = getByTestId('clear_all_notifications')

    fireEvent.click(clearAllNotificatoinButotn)
    expect(clearAllNotificationsMock).toHaveBeenCalled()
  })
})
