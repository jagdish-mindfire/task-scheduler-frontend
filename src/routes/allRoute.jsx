import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/Common/Loader";


// Lazy-loaded components
const Login = lazy(() => import("../pages/Authentication/Login"));
const Signup = lazy(() => import("../pages/Authentication/Signup"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProtectedRouteMiddleware = lazy(() => import("./middlewares/ProtectedRouteMiddleware"));
const AppLayout = lazy(()=>import("../AppLayout.jsx"));
const TaskComponet= lazy(()=>import("../pages/Task/Task.jsx"));
const Home = lazy(() => import("../pages/Home"));

const NewLogin = lazy(() => import("../pages/Authentication/LoginNew.jsx"));
const NewSignup = lazy(() => import("../pages/Authentication/SignupNew.jsx"));
// Routes configuration
const unProtectedRoutes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login-v2", element: <NewLogin /> },
  { path: "/signup-v2", element: <NewSignup /> },
 
];

const protectedRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/tasks", element: <TaskComponet /> },
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
