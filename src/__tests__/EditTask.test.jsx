import { render, fireEvent } from "@testing-library/react";
import EditTask from "../components/EditTask";
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

describe("EditTask Component", () => {
  const component = (
    <TaskContext.Provider value={mockTaskContext}>
      <EditTask open={true} setOpen={() => console.log("hi")} />
    </TaskContext.Provider>
  );

  test("Renders successfully", () => {
    render(component);
    // expect(true).toBeTruthy();
  });

  test("Updating Form Values", () => {
    // Setup

    const { getByTestId } = render(component);

    const title = getByTestId("edittask_title");
    const description = getByTestId("edittask_description");
    const due_date = getByTestId("edittask_due_date");

    fireEvent.change(title, {
      target: { value: "Complete the frontend testing" },
    });
    fireEvent.change(description, {
      target: { value: "This task needs to be completed." },
    });
    fireEvent.change(due_date, { target: { value: "2022-01-01 12:00:00" } });
    
  });

  test("Submitting with values", () => {
    // Setup

    const { getByTestId } = render(component);

    const title = getByTestId("edittask_title");
    const description = getByTestId("edittask_description");
    const due_date = getByTestId("edittask_due_date");
    const submitBtn = getByTestId("edittask_submit");

    fireEvent.change(title, {
      target: { value: "Complete the frontend testing" },
    });
    fireEvent.change(description, {
      target: { value: "This task needs to be completed." },
    });
    fireEvent.change(due_date, { target: { value: "2022-01-01 12:00:00" } });
    fireEvent.click(submitBtn);

  });

  test("Submitting without values", () => {
    // Setup
    
    const { getByTestId } = render(component);

    const submitBtn = getByTestId("edittask_submit");

    
    fireEvent.click(submitBtn);

  });

});
