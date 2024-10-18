import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { TaskProvider } from "./context/TaskContext.jsx";
import { TaskModelStatesProvider } from "./context/TaskModelStates.jsx";
import { router} from "./routes/allRoute.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
      <TaskProvider>
        <TaskModelStatesProvider>
        <RouterProvider router={router} />
        <ToastContainer />
        </TaskModelStatesProvider>
      </TaskProvider>
  );
};

export default App;
