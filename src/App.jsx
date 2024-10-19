import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { TaskProvider } from "./context/TaskContext.jsx";
import { TaskModelStatesProvider } from "./context/TaskModelStates.jsx";
import { router} from "./routes/allRoute.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient()


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <TaskModelStatesProvider>
        <RouterProvider router={router} />
        <ToastContainer />
        </TaskModelStatesProvider>
      </TaskProvider>
    </QueryClientProvider>
  );
};

export default App;
