import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/Common/Loader";


// Lazy-loaded components
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProtectedRouteMiddleware = lazy(() => import("./middlewares/ProtectedRouteMiddleware"));
const AppLayout = lazy(()=>import("../components/Layout/AppLayout.jsx"));
const TaskComponet= lazy(()=>import("../pages/Task/Index.jsx"));
const TaskDetails = lazy(()=>import("../components/Task/TaskDetails.jsx"));
const Home = lazy(() => import("../pages/Home/Index.jsx"));

const Login = lazy(() => import("../pages/Authentication/Login.jsx"));
const Signup = lazy(() => import("../pages/Authentication/Signup.jsx"));
// Routes configuration
const unProtectedRoutes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
 
];

const protectedRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/tasks", element: <TaskComponet /> },
    { path: "/tasks/:viewType", element: <TaskComponet /> },
    {
      path: "/tasks/:viewType/:taskId",
      element: (
        <Suspense fallback={<Loader />}>
          <TaskComponet /> {/* Display TaskComponent */}
          <TaskDetails />   {/* Display TaskDetails */}
        </Suspense>
      ),
    },
    { path: "/home", element: <Home /> },
]


// Router setup with lazy-loaded routes
const router = createBrowserRouter([
  ...unProtectedRoutes.map((route) => ({
    path: route.path,
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRouteMiddleware path={route.path}>{route.element}</ProtectedRouteMiddleware>
      </Suspense>
    ),
  })),
  ...protectedRoutes.map((route) => ({
    path: route.path,
    element: (
      <Suspense fallback={<Loader />}>
        <AppLayout>
        <ProtectedRouteMiddleware path={route.path}>{route.element}</ProtectedRouteMiddleware>
        </AppLayout>
      </Suspense>
    ),
  })),
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export { router };
