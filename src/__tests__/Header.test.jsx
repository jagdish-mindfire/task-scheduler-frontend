global.ResizeObserver = class {
  constructor(callback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

import { render, fireEvent,act } from "@testing-library/react";

// To Test
import Header from "../components/Header";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";


const mockTaskContext = {
  edittask: jest.fn(),
  updateTask: jest.fn(),
  taskList: [],
  setTaskList: jest.fn(),
  deleteTask: jest.fn(),
  allNotifications: [ {
    "_id": "66f2e908f9bc689fe48c77d9",
    "taskId": "66f2e8cbf9bc689fe48c7790",
    "notificationType": "overdue",
    "isRead": false,
    "createdAt": "2024-09-24T16:30:00.388Z",
    "updatedAt": "2024-09-24T16:30:00.388Z",
    "title": "adf",
    "dueDate": "2024-09-03T16:28:00.000Z"
},{
  "_id": "66f2e908f9sd3689fe48c77d9",
  "taskId": "66f2e8cbf9bc689fe48c7790",
  "notificationType": "due",
  "isRead": false,
  "createdAt": "2024-09-24T16:30:00.388Z",
  "updatedAt": "2024-09-24T16:30:00.388Z",
  "title": "this is another title",
  "dueDate": "2024-09-03T16:28:00.000Z"
}],
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

describe("Header Component", () => {
  const component = (
    <TaskContext.Provider value={mockTaskContext}>
      <AuthContext.Provider value={mockAuthContext}>
        <Header />
    </AuthContext.Provider>
  </TaskContext.Provider>
 
  );

  test("Renders successfully", () => {
    render(component);
  });

  
  // test("Successfully clicked on Clear Single notificatoin", () => {
  //   const {getByTestId} = render(component);
  //   const bellIcon = getByTestId("bell_icon");
  //   const clearSingleNotification = getByTestId("clear_notification");
  //   act(()=>{
  //     fireEvent.click(bellIcon);
  //     fireEvent.click(clearSingleNotification);
  //   });
  // });
  

  test("Successfully clicked on Clear all notificatoin", () => {
    const {getByTestId} = render(component);
    const bellIcon = getByTestId("bell_icon");
    fireEvent.click(bellIcon);
    const clearAllNotificatoinButotn = getByTestId("clear_all_notifications");
    fireEvent.click(clearAllNotificatoinButotn);
  });
  

  
  // test("Successfully clicked on Signout", () => {
  //   const {getByTestId} = render(component);
  //   const logoutButton = getByTestId("logout_btn");
  //   fireEvent.click(logoutButton);
  
  // });


});