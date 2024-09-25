import { render, fireEvent } from "@testing-library/react";
import ViewTask from "../components/ViewTask";
import { TaskContext } from "../context/TaskContext";

// Mock Context
const mockTaskContext = {
  edittask: jest.fn(),
  updateTask: jest.fn(),
  taskList: [],
  setTaskList: jest.fn(),
  deleteTask: jest.fn(),
  allNotifications: [],
  setAllNotifications: jest.fn(),
  notificationCount: 3,
};


const mockData = {
    taskData : {
        id: 1,
        title: "Complete the frontend testing",
        description: "This task needs to be completed.",
        due_date: "2022-01-01 12:00:00",
        is_completed: false,
    },
}

describe("ViewTask Component", () => {
  const component = (
    <TaskContext.Provider value={mockTaskContext}>
      <ViewTask open={true} setOpen={() => console.log("hi")} taskData={mockData.taskData}/>
    </TaskContext.Provider>
  );

  test("Renders for incompleted task successfully", () => {
    render(   <TaskContext.Provider value={mockTaskContext}>
      <ViewTask open={true} setOpen={() => console.log("hi")} taskData={mockData.taskData}/>
    </TaskContext.Provider>);
    
  });

  test("Renders for completed task successfully", () => {
    mockData.taskData.is_completed = true;
    render(   <TaskContext.Provider value={mockTaskContext}>
      <ViewTask open={true} setOpen={() => console.log("hi")} taskData={mockData.taskData}/>
    </TaskContext.Provider>);
  });

  test("Successfully click on edit Task", () => {
    mockData.taskData.is_completed = false;
    const {getByTestId} = render(   <TaskContext.Provider value={mockTaskContext}>
      <ViewTask open={true} setOpen={() => console.log("hi")} taskData={mockData.taskData}/>
    </TaskContext.Provider>);
       const editButton = getByTestId("edit");
       fireEvent.click(editButton);
  });
  
  test("Successfully click on Mark Complete Task", () => {
    mockData.taskData.is_completed = false;
    const {getByTestId} = render(   <TaskContext.Provider value={mockTaskContext}>
      <ViewTask open={true} setOpen={() => console.log("hi")} taskData={mockData.taskData}/>
    </TaskContext.Provider>);
       const markCompleteButton = getByTestId("mark_complete");
       fireEvent.click(markCompleteButton);
  });

  test("Successfully click on Delete Task", () => {
    mockData.taskData.is_completed = false;
    const {getByTestId} = render(   <TaskContext.Provider value={mockTaskContext}>
      <ViewTask open={true} setOpen={() => console.log("hi")} taskData={mockData.taskData}/>
    </TaskContext.Provider>);
       const deleteButton = getByTestId("delete");
       fireEvent.click(deleteButton);
  });

});