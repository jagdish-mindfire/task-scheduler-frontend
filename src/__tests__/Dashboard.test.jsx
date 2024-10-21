global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};


import { render, fireEvent } from "@testing-library/react";
import Dashboard from "../pages/Dashboard/Dashboard";
import { TaskContext } from "../context/TaskContext";
import { MemoryRouter } from 'react-router-dom';
import { TaskModelStates } from "../context/TaskModelStates";

// Mock Context
const mockTaskContext = {
  taskList: [],
  setTaskList: jest.fn(),
  allNotifications: [],
  setAllNotifications: jest.fn(),
  notificationCount: 3,
  setNotificationCount: jest.fn(),
  taskLoader: false,
};

const mockTaskModelStates = {
  modelStates: {
    showViewTask: false,
    showAddTask: true,
    showEditTask: false,
    showDeleteConfirmation: false,
  },
  setModelStates: jest.fn(),
  updateModelStates: jest.fn(),
};

describe("Dashboard Component", () => {
  const component = (
    <MemoryRouter>
    <TaskContext.Provider value={mockTaskContext}>
    <TaskModelStates.Provider value={mockTaskModelStates}>
      <Dashboard/>
      </TaskModelStates.Provider>
    </TaskContext.Provider>
    </MemoryRouter>

  );

  test("Renders Dashboard Component", () => {
    render(component);
  });

});
