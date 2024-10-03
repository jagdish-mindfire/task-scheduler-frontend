

import { render, fireEvent } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";

// Mock Context
const mockTaskContext = {
  addTask: jest.fn(),
  updateTask: jest.fn(),
  taskList: [{
    "_id": "66f12b4d94afc0d82802006f",
    "uid": "66ed5add0126ce84b0921c95",
    "title": "Over due task",
    "description": "this task is to test the notification of overdue task",
    "dueDate": "2024-09-23T08:46:00.000Z",
    "isCompleted": 0,
    "dueNotificationCount": 0,
    "overDueNotificationCount": 1,
    "createdAt": "2024-09-23T08:48:13.330Z",
    "updatedAt": "2024-09-23T08:50:00.623Z",
    "__v": 0
}],
  setTaskList: jest.fn(),
  deleteTask: jest.fn(),
  allNotifications: [],
  setAllNotifications: jest.fn(),
  notificationCount: 3,
};

const mockAuthContext = {
  userName:"user",
  setUserName:jest.fn(),
  setIsAuthenticated:jest.fn(),
  isAuthenticated:true,
  login:jest.fn(),
  logout:jest.fn(),
  accessToken:"some value",
  setAccessToken:jest.fn(),
  refreshToken:"some value",
  setRefreshToken:jest.fn(),
}

describe("Dashboard Component", () => {
  const component = (
    <TaskContext.Provider value={mockTaskContext}>
    <AuthContext.Provider value={mockAuthContext}>
      <Dashboard/>
    </AuthContext.Provider>
    </TaskContext.Provider>
  );

  test("Renders with Access Token", () => {
    render(component);
  });

  test("Renders without Access Token", () => {
    mockAuthContext.accessToken=null;
    render(<TaskContext.Provider value={mockTaskContext}>
      <AuthContext.Provider value={mockAuthContext}>
        <Dashboard/>
      </AuthContext.Provider>
      </TaskContext.Provider>);
  });

  test("Clicking on Add task", () => {
    const { getByTestId } = render(component);

    const addTaskButton = getByTestId("addtask_btn");
    expect(addTaskButton).toBeTruthy();

    fireEvent.click(addTaskButton);
    // expect(mockTaskContext.addTask).toHaveBeenCalled();

  });

  test("Clicking on Sort task", () => {
    const { getByTestId } = render(component);

    const sortTaskButton = getByTestId("sort_tasks");
    fireEvent.click(sortTaskButton);
  });

  test("Clicking on View task", () => {
    const { getByTestId } = render(component);

    const viewTaskButton= getByTestId("view_task");
    fireEvent.click(viewTaskButton);
  });

});
