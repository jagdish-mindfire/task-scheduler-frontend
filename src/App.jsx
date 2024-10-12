import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { router} from "./routes/allRoute.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
