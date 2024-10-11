import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import AuthMiddleware from "./routes/middleware/AuthMiddleware.jsx";
import RedirectIfLoggedInMiddleware from "./routes/middleware/RedirectIfLoggedInMiddleware.jsx";
import { authRoutes, protectedRoutes } from "./routes/allRoute.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import "./index.css";

const App = () => {
  const router = createBrowserRouter([
    ...protectedRoutes.map((route) => ({
      path: route.path,
      element: <AuthMiddleware>{route.element}</AuthMiddleware>,
    })),
    ,
    ...authRoutes.map((route) => ({
      path: route.path,
      element: (
        <RedirectIfLoggedInMiddleware redirectTo={'/dashboard'}>
          {route.element}
        </RedirectIfLoggedInMiddleware>
      ),
    })),
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
