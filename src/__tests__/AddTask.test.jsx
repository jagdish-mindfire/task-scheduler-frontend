import { render, fireEvent ,act} from "@testing-library/react";
import AddTask from "../components/Task/AddTask";
import { TaskContext } from "../context/TaskContext";
import { TaskModelStates } from "../context/TaskModelStates";
import useTask from "../hooks/useTask";
import { ShowAddTaskToast } from "../services/toastService";

jest.mock("../hooks/useTask");
jest.mock("../services/toastService");

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

describe("AddTask Component",() => {
  const component = (
    <TaskContext.Provider value={mockTaskContext}>
      <TaskModelStates.Provider value={mockTaskModelStates}>
        <AddTask />
      </TaskModelStates.Provider>
    </TaskContext.Provider>
  );

 
  const addTaskMock = jest.fn();
  useTask.mockReturnValue({ addTask: addTaskMock });


  test("Renders successfully", () => {
    render(component);
  });

  test("Submitting with values",async () => {
    // Setup

    const { getByTestId } = render(component);

    const title = getByTestId("title");
    const description = getByTestId("description");
    const due_date = getByTestId("due_date");
    const submitBtn = getByTestId("submit_task");

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
    fireEvent.change(due_date, { target: { value: "2022-01-01" } });

    fireEvent.click(submitBtn);

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    // Assertions to check if addTask was called
    expect(addTaskMock).toHaveBeenCalledWith({
      title: "Complete the frontend testing",
      description: "This task needs to be completed.",
      due_date: "2022-01-01",
    });

    // Check if updateModelStates was called
    expect(mockTaskModelStates.updateModelStates).toHaveBeenCalledWith({ showAddTask: false });

    // Check if ShowAddTaskToast was called
    expect(ShowAddTaskToast).toHaveBeenCalled();

    // Optionally log the call history
    console.log(addTaskMock.mock.calls); // This will show you all calls to the function

  });

});
