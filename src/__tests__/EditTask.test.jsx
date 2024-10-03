import { render, fireEvent } from "@testing-library/react";
import EditTask from "../components/EditTask";
import { TaskContext } from "../context/TaskContext";

// Mock Context
const mockTaskContext = {
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

  });

  test("Updating Form Values", () => {

    const { getByTestId } = render(component);

    const title = getByTestId("edittask_title");
    const description = getByTestId("edittask_description");
    const due_date = getByTestId("edittask_due_date");

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(due_date).toBeTruthy();

    fireEvent.change(title, {
      target: { value: "Complete the frontend testing" },
    });
    fireEvent.change(description, {
      target: { value: "This task needs to be completed." },
    });
    fireEvent.change(due_date, { target: { value: "2022-01-01 12:00:00" } });
    
    expect(title.value).toBe("Complete the frontend testing");
    expect(description.value).toBe("This task needs to be completed.");
    expect(due_date.value).toBe("2022-01-01T12:00");

  });

  test("Submitting with values", () => {
    // Setup

    const { getByTestId } = render(component);

    const title = getByTestId("edittask_title");
    const description = getByTestId("edittask_description");
    const due_date = getByTestId("edittask_due_date");
    const submitBtn = getByTestId("edittask_submit");

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(due_date).toBeTruthy();
    expect(submitBtn).toBeTruthy();

    fireEvent.change(title, {
      target: { value: "Complete the frontend testing" },
    });
    fireEvent.change(description, {
      target: { value: "This task needs to be completed." },
    });
    fireEvent.change(due_date, { target: { value: "2022-01-01 12:00:00" } });
    
    expect(title.value).toBe("Complete the frontend testing");
    expect(description.value).toBe("This task needs to be completed.");
    expect(due_date.value).toBe("2022-01-01T12:00");
    
    fireEvent.click(submitBtn);
    expect(mockTaskContext.updateTask).toHaveBeenCalled();

  });

  test("Submitting without values", () => {
    // Setup
    
    const { getByTestId } = render(component);

    const submitBtn = getByTestId("edittask_submit");
    expect(submitBtn).toBeTruthy();
    
    fireEvent.click(submitBtn);
    expect(mockTaskContext.updateTask).toHaveBeenCalled();
  });

});
