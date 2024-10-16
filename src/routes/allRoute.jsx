import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/Common/Loader";

// Lazy-loaded components
const Login = lazy(() => import("../pages/Authentication/Login"));
const Signup = lazy(() => import("../pages/Authentication/Signup"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AuthMiddleware = lazy(() => import("./middlewares/AuthMiddleware"));

// Routes configuration
const routes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashboard", element: <Dashboard /> },
];


// Router setup with lazy-loaded routes
const router = createBrowserRouter([
  ...routes.map((route) => ({
    path: route.path,
    element: (
      <Suspense fallback={<Loader />}>
        <AuthMiddleware path={route.path}>{route.element}</AuthMiddleware>
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
