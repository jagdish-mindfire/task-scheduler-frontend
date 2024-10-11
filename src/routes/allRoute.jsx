
import Signup from "../pages/Authentication/Signup";
import Login from "../pages/Authentication/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

const authRoutes = [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
];

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
];

export { protectedRoutes, authRoutes };
